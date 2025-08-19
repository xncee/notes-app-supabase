import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export function NoteSkeleton() {
  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader>
        <Skeleton className="h-5 w-[160px]" />
        <Skeleton className="h-7 w-[250px]" />
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
      </CardContent>
      <CardFooter className="mt-auto flex w-full items-center justify-end px-4">
        <div className="flex gap-2">
          <Skeleton className="h-8.5 w-[75px]" />
          <Skeleton className="h-8.5 w-[85px]" />
        </div>
      </CardFooter>
    </Card>
  );
}
