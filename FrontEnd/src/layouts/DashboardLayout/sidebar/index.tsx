"use client"
import { FC } from 'react'
import Image from 'next/image';
import Links from "./components/Links";
import { MdClose } from 'react-icons/md';
import Container from '@/components/container';
import { useScreenView } from '@/hooks/ScreenViewProvider';
import { useSidebarContext } from '@/hooks/SidebarProvider';

type Props = {}

const Sidebar: FC<Props> = () => {
  const { isMD } = useScreenView()
  const { openSidebar, setOpenSidebar } = useSidebarContext()

  return (
    <>
      <div
        className={`bg-[#000] bg-opacity-70 fixed inset-0 z-50 
        ${openSidebar && isMD ? 'block w-dvw h-dvh' : 'hidden'}`}
        onClick={() => setOpenSidebar(false)}
      />

      <div
        className={`sm:none duration-175 linear fixed !z-50 flex min-h-full h-dvh flex-col 
        p-2 gap-1.5 transition-all dark:text-white md:!z-50 lg:!z-50 xl:!z-0 max-h-[100dvh]
        ${openSidebar ? "-translate-x-0" : "-translate-x-96"}`}
      >
        <Container className="!shadow-2xl !shadow-white/5 !rounded-t-2xl !rounded-b-lg flex flex-col pb-[58px]">
          <div className="absolute top-2 right-2 p-1.5 bg-lightPrimary dark:bg-darkContainerPrimary rounded-full">
            <div className="cursor-pointer bg-red-500 w-3.5 h-3.5 rounded-full" onClick={() => setOpenSidebar(false)} >
            </div>
          </div>

          <div className={`mx-[15px] mt-[55px] flex flex-col items-center relative w-[210px]`}>
            <Image src="/Logo_horizontal.png" alt="Your image" width={180} height={150} />
          </div>
        </Container>

        <Container className="!shadow-2xl !shadow-white/5 py-3 !rounded-b-2xl !rounded-t-lg overflow-y-auto no-scrollbar flex flex-col h-[calc(100dvh-185px)] max-h-[calc(100dvh-185px)]">
          <Links onClickRoute={isMD ? () => setOpenSidebar(false) : undefined} />
        </Container>
      </div>
    </>
  );
};

export default Sidebar;