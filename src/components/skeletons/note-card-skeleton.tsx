import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export function NoteCardSkeleton() {
  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-7 w-full" />
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
      </CardContent>
      <CardFooter className="mt-auto flex w-full items-center justify-end px-4">
        <div className="flex gap-2">
          <Skeleton className="h-8.5 w-20" />
          <Skeleton className="h-8.5 w-full" />
        </div>
      </CardFooter>
    </Card>
  );
}
