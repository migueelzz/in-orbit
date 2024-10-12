import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";

import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBR)

export function Summary() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!summary) {
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const goalsCompletedPorcent = summary ? Math.round((summary.completed / summary.total) * 100) : 0

  return (
    <div className="flex flex-col w-full py-10 max-w-[480px] mx-auto gap-6 px-4 lg:px-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" /> Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={summary?.completed} max={summary?.total}>
          <ProgressIndicator style={{ width: `${goalsCompletedPorcent}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">{summary?.completed}</span> de{" "}
            <span className="text-zinc-100">{summary?.total}</span> metas nessa semana.
          </span>
          <span>{goalsCompletedPorcent}%</span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {Object.entries(summary?.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const formattedDate = dayjs(date).format("DD [de] MMMM")

            return (
              <div className="flex flex-col gap-4" key={date}>
                <h3 className="font-medium capitalize">
                  {weekDay}{" "}
                  <span className="text-xs text-zinc-400">({formattedDate})</span>
                </h3>
    
                <ul className="flex flex-col gap-3">
                  {goals.map((goal) => {
                    const time = dayjs(goal.completedAt).format('HH:mm')

                    return (
                      <li className="flex items-center gap-2" key={goal.id}>
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          Você completou "
                          <span className="text-zinc-100 font-medium">{goal.title}</span>" 
                          às{' '}
                          <span className="text-zinc-100 font-medium">{time}h</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
