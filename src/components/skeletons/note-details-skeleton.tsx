import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function NoteDetailsSkeleton() {
  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader className="flex flex-col justify-between gap-5 md:flex-row">
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-7 pb-2" />
        </div>
        <div className="mb-auto ml-auto flex gap-2">
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <Separator />
      <CardFooter className="flex w-full items-center justify-between px-4"></CardFooter>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
      </CardContent>
    </Card>
  );
}
