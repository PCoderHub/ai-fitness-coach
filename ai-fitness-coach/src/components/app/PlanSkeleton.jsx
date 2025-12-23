import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PlanSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="bg-white/70">
        <CardHeader>
          <CardTitle className="text-3xl">
            Your Personalized Fitness Plan
          </CardTitle>
          <CardDescription>
            AI-generated workout and nutrition guidance tailored for you.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Tabs */}
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>

          {/* List placeholder */}
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PlanSkeleton;
