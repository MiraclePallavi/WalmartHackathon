import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function CustomSwitch() {
  return (
    <div className="flex items-center space-x-2">
      {/* <Label htmlFor="airplane-mode">Is this a gifting Twin?</Label> */}
      <div className="flex font-bold gap-2 items-center">Is this a gifting Twin?<Switch id="airplane-mode" /></div>
      
      
    </div>
  )
}
