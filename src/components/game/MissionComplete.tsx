"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "./StarRating";
import Link from "next/link";

export function MissionComplete({
  stars,
  xp,
  missionTitle,
  nextMissionHref,
  nextMissionLabel,
  onClose,
}: {
  stars: number;
  xp: number;
  missionTitle: string;
  nextMissionHref?: string;
  nextMissionLabel?: string;
  onClose?: () => void;
}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {showConfetti && (
        <ReactConfetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative mx-4 w-full max-w-md rounded-2xl bg-card p-8 text-center shadow-2xl"
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        )}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-5xl"
        >
          🎉
        </motion.div>

        <h2 className="mb-2 text-2xl font-bold">미션 완료!</h2>
        <p className="mb-6 text-muted-foreground">{missionTitle}</p>

        <div className="mb-4 flex justify-center">
          <StarRating stars={stars} size="lg" />
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-8 text-3xl font-bold text-amber-500"
        >
          +{xp} XP
        </motion.div>

        <div className="flex flex-col gap-3">
          {nextMissionHref && (
            <Button asChild size="lg">
              <Link href={nextMissionHref}>
                {nextMissionLabel || "다음 미션"}
              </Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
