export const removeDiacritics = ({ str }: RemoveDiacriticesProps) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');