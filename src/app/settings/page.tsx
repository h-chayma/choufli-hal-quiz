'use client'

import { SetStateAction, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft } from 'lucide-react'

export default function Settings() {
    const [soundEnabled, setSoundEnabled] = useState(true)
    const [volume, setVolume] = useState(50)

    return (
        <div className="h-screen bg-gradient-to-r overflow-hidden relative p-4">
            <div className="flex justify-center items-center h-full">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl text-center">الإعدادات</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sound-toggle">تفعيل الصوت</Label>
                            <Switch
                                id="sound-toggle"
                                checked={soundEnabled}
                                onCheckedChange={setSoundEnabled}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="volume-slider">مستوى الصوت</Label>
                            <Slider
                                id="volume-slider"
                                min={0}
                                max={100}
                                step={1}
                                value={[volume]}
                                onValueChange={(value: SetStateAction<number>[]) => setVolume(value[0])}
                                disabled={!soundEnabled}
                            />
                        </div>
                            <Button className="w-full bg-accent hover:bg-yellow-700">
                                <ArrowLeft className="mr-2 h-4 w-4" /> رجوع للصفحة الرئيسية
                            </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
