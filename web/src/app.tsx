import { Dialog } from "./components/ui/dialog";

import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
import { EmptyGoals } from "./components/empty-goals";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";

export function App() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  return (
    <Dialog>

      {summary && summary?.total > 0 ?  <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  );
}
