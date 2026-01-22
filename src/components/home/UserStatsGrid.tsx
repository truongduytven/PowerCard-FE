import { ReactNode } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

interface UserStatItem {
  label: string;
  value: string;
  icon: ReactNode;
  gradient: string;
}

interface UserStatsGridProps {
  userStats: UserStatItem[];
}

export function UserStatsGrid({ userStats }: UserStatsGridProps) {
  return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {userStats.map((stat, index) => (
            <CardContainer key={index} className="inter-var w-full !py-0">
              <CardBody
                className="
                  bg-gray-50 relative group/card  
                  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] 
                  border-black/[0.1] 
                  dark:bg-gray-800
                  w-full h-auto 
                  rounded-xl p-6 border 
                "
              >
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white flex items-center gap-2"
                >
                  {stat.icon} {stat.label}
                </CardItem>

                <div className="flex justify-start items-center mt-10">
                  <CardItem
                    translateZ={20}
                    className="text-sm font-medium dark:text-white text-neutral-700"
                  >
                    {stat.value}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
  );
}
