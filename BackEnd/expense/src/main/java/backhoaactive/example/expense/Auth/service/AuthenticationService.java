package backhoaactive.example.expense.Auth.service;

import backhoaactive.example.expense.Auth.dto.request.AuthenticationRequest;
import backhoaactive.example.expense.Auth.dto.request.IntrospectRequest;
import backhoaactive.example.expense.Auth.dto.request.LogoutRequest;
import backhoaactive.example.expense.Auth.dto.request.RefreshRequest;
import backhoaactive.example.expense.Auth.dto.response.AuthenticationResponse;
import backhoaactive.example.expense.Auth.dto.response.IntrospectResponse;
import backhoaactive.example.expense.Auth.entity.InvalidateToken;
import backhoaactive.example.expense.Auth.repository.InvalidateTokenRepository;
import backhoaactive.example.expense.User.entity.User;
import backhoaactive.example.expense.User.repository.UserRepository;
import backhoaactive.example.expense.exception.AppException;
import backhoaactive.example.expense.exception.ErrorCode;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    UserRepository userRepository;

    InvalidateTokenRepository invalidateTokenRepository;


    @NonFinal
    @Value("${jwt.signerKey}") // doc bien tu file yaml
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}") // doc bien tu file yaml
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}") // doc bien tu file yaml
    protected long REFRESHABLE_DURATION;

    public AuthenticationResponse authenticate(AuthenticationRequest requests) {
        log.info("AUTH");
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        var user = userRepository
                .findByUsername(requests.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED_EXCEPTION));

        boolean authenticated = passwordEncoder.matches(requests.getPassword(), user.getPassword());

        if (!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED_EXCEPTION);
        }
        return AuthenticationResponse.builder()
                .success(true)
                .token(generateToken(user))
                .build();
    }

    public void logout(LogoutRequest logoutRequest) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(logoutRequest.getToken(), true);

            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiresTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidateToken invalidateToken =
                    InvalidateToken.builder().ID(jit).expiresTime(expiresTime).build();
            invalidateTokenRepository.save(invalidateToken);
        } catch (AppException e) {
            log.info("Token is expired");
        }
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();

        try {
            verifyToken(token, false);
        } catch (AppException e) {
            return IntrospectResponse.builder().valid(false).build();
        }

        return IntrospectResponse.builder().valid(true).build();
    }

    public AuthenticationResponse refreshToken(RefreshRequest refreshRequest) throws ParseException, JOSEException {

        var signToken = verifyToken(refreshRequest.getToken(), true);

        String jit = signToken.getJWTClaimsSet().getJWTID();
        Date expiresTime = signToken.getJWTClaimsSet().getExpirationTime();

        InvalidateToken invalidateToken =
                InvalidateToken.builder().ID(jit).expiresTime(expiresTime).build();

        invalidateTokenRepository.save(invalidateToken);

        var username = signToken.getJWTClaimsSet().getSubject();

        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_INVALID));
        return AuthenticationResponse.builder()
                .token(generateToken(user))
                .success(true)
                .build();
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws ParseException, JOSEException {

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expirationTime = (isRefresh)
                ? new Date(signedJWT
                        .getJWTClaimsSet()
                        .getIssueTime()
                        .toInstant()
                        .plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS)
                        .toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!verified && expirationTime.after(new Date())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED_EXCEPTION);
        }
        if (invalidateTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED_EXCEPTION);
        }

        return signedJWT;
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("Tnhahehe") // thong thuong la domain
                .issueTime(new Date()) // TGian khoi tao
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli() // TGian KET THUC
                        ))
                .jwtID(UUID.randomUUID().toString()) // tạo id cho token
                .claim("scope", buildScope(user)) // tạo scope cho token để authorize
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        stringJoiner.add(user.getRole().toString());

        return stringJoiner.toString();
    }
}
