"use client";
import { Toaster } from "sonner";
import { SideNavBar } from "@/components/SideNav";

import { History } from "@/components/History";
import { useGetPrompts } from "@/api/useGetPrompts";
import { HashLoader } from "react-spinners";
import { NothingToShow } from "@/components/NothingToShow";

export default function ProposalGeneration() {
  const { data: prompts, isLoading: fetchingPrompts } = useGetPrompts();
  return (
    <>
      <Toaster closeButton />
      <div className="flex flex-row">
        <SideNavBar />
        <div className="w-full">
          <div className="pt-12 pb-8 pl-4 pr-4">
            {fetchingPrompts ? (
              <div className="w-full h-full grid place-items-center">
                <HashLoader color="black" size={45} />
              </div>
            ) : prompts?.length === 0 ? (
              <NothingToShow />
            ) : (
              prompts &&
              prompts.map((i, ix) => {
                return (
                  <History
                    completion={i.completion}
                    date={i.createdAt}
                    prompt={i.prompt}
                    isFirst={ix === 0}
                    key={i._id}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
