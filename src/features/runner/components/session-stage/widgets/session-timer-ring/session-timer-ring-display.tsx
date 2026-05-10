type SessionTimerRingDisplayProps = {
  blockLabel: string;
  timerLabel: string;
  statusLabel: string;
};

export function SessionTimerRingDisplay({
  blockLabel,
  timerLabel,
  statusLabel,
}: SessionTimerRingDisplayProps) {
  return (
    <>
      <div className="text-muted-foreground text-xl">{blockLabel}</div>
      <h3 className="text-9xl tabular-nums tracking-tighter">{timerLabel}</h3>
      <p className="-mt-2 text-4xl">{statusLabel}</p>
    </>
  );
}
