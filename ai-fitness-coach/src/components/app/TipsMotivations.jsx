import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TipsMotivations({ tips, motivation }) {
  return (
    <div className="space-y-8">
      {/* Motivation */}
      <Card className="bg-muted/40 border">
        <CardHeader>
          <CardTitle className="text-2xl">Words from Your Coach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {motivation.map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="text-base leading-relaxed text-muted-foreground"
            >
              {text}
            </motion.p>
          ))}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-muted/40 border">
        <CardHeader>
          <CardTitle className="text-2xl">Practical Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-3"
            >
              <span className="text-primary font-semibold">•</span>
              <p className="text-muted-foreground leading-relaxed">{tip}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default TipsMotivations;
