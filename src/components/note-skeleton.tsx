import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function NoteSkeleton() {
  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader className="text-lg font-bold">
        <Skeleton className="h-7 w-[250px]" />
      </CardHeader>
      <CardContent className="line-clamp-3 flex flex-col gap-2 align-text-top break-words whitespace-pre-line">
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between px-4">
        <Skeleton className="h-6 w-[100px]" />
        <div className="flex gap-2">
          <Skeleton className="h-8.5 w-[65px]" />
          <Skeleton className="h-8.5 w-[75px]" />
        </div>
      </CardFooter>
    </Card>
  );
}
