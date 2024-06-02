"use client"

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, TimerReset } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function PomodoroTimer() {
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [time, setTime] = useState(25 * 60); // Initial session time
    const [sessionDuration, setSessionDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && time > 0) {
            timerRef.current = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (time === 0) {
            if (isBreak) {
                setTime(sessionDuration * 60);
            } else {
                setTime(breakDuration * 60);
            }
            setIsBreak(!isBreak);
        }
        return () => clearTimeout(timerRef.current!);
    }, [isActive, time, isBreak, sessionDuration, breakDuration]);

    const startTimer = () => setIsActive(true);

    const pauseTimer = () => setIsActive(false);

    const resetTimer = () => {
        setIsActive(false);
        setTime(sessionDuration * 60);
        setIsBreak(false);
    };

    const handleSessionChange = ([value]: number[]) => {
        setSessionDuration(value);
        if (!isActive && !isBreak) {
            setTime(value * 60);
        }
    };

    const handleBreakChange = ([value]: number[]) => {
        setBreakDuration(value);
        if (!isActive && isBreak) {
            setTime(value * 60);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <section className={"bg-muted/40 border-2 h-full rounded-2xl p-10"}>
            <div className={"flex flex-col items-center justify-center my-14"}>
                <p className={"max-md:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 text-center inline-block bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent"}>
                    Pomodoro Timer
                </p>
                <p className={"max-w-2xl text-center text-balance max-md:text-sm"}>
                    The Pomodoro Technique is a time management method developed by Francesco Cirillo in the
                    late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length,
                    separated by short breaks. This approach can help improve focus and productivity by encouraging
                    dedicated work sessions and regular rest periods.
                </p>
                <section className={"mt-10"}>
                    <div className={"flex max-md:flex-col flex-row max-md:space-y-8 md:space-x-12 items-center"}>
                        <section className={"flex flex-col gap-1.5 items-center justify-center bg-primary rounded-full h-52 w-52 px-5 py-5 text-white"}>
                            <p className={"font-medium text-secondary"}>{isBreak ? 'Break' : 'Session'}</p>
                            <p className={"font-extrabold text-4xl text-secondary"}>{formatTime(time)}</p>
                        </section>
                        <section>
                            <div className={"grid gap-5"}>
                                <section className={"space-y-2"}>
                                    <p>Session Duration <span className="font-semibold">({sessionDuration} min)</span></p>
                                    <Slider
                                        defaultValue={[sessionDuration]}
                                        min={5}
                                        max={60}
                                        step={1}
                                        disabled={isActive}
                                        onValueChange={handleSessionChange}
                                        className={"w-60"}
                                    />
                                </section>
                                <section className={"space-y-2"}>
                                    <p>Break Duration <span className="font-semibold">({breakDuration} min)</span></p>
                                    <Slider
                                        defaultValue={[breakDuration]}
                                        min={1}
                                        max={60}
                                        step={1}
                                        disabled={isActive}
                                        onValueChange={handleBreakChange}
                                    />
                                </section>
                                <section className={"flex gap-1.5 w-full mt-1.5"}>
                                    {!isActive ? (
                                        <Button className={"w-full"} onClick={startTimer}>
                                            <Play className={"h-4 w-4 mr-2"} /> Start
                                        </Button>
                                    ) : (
                                        <Button className={"w-full"} onClick={pauseTimer}>
                                            <Pause className={"h-4 w-4 mr-2"} /> Pause
                                        </Button>
                                    )}

                                    <Button onClick={resetTimer}>
                                        <TimerReset className={"h-4 w-4"} />
                                    </Button>
                                </section>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </section>
    );
}
