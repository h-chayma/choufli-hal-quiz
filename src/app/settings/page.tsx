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
        <div className="h-screen bg-gradient-to-r from-yellow-200 to-yellow-500 overflow-hidden relative p-4">
            <div className="flex justify-center items-center h-full">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl text-center arabic-text">الإعدادات</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sound-toggle" className="arabic-text">تفعيل الصوت</Label>
                            <Switch
                                id="sound-toggle"
                                checked={soundEnabled}
                                onCheckedChange={setSoundEnabled}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="volume-slider" className="arabic-text">مستوى الصوت</Label>
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
                        <Link href="/" passHref>
                            <Button className="w-full bg-yellow-600 hover:bg-yellow-700 arabic-text">
                                <ArrowLeft className="mr-2 h-4 w-4" /> رجوع للصفحة الرئيسية
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
