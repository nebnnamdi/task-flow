import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react"; // The 3-dot icon

export default function ActionDropdown({ updateStatus, id }) {
  return (
    <DropdownMenu>
      {/* The 3-dot Button */}
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <button className="flex items-center justify-center w-7 h-7 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </DropdownMenuTrigger>

      {/* The Dropdown Menu Card */}
      <DropdownMenuContent
        align="end"
        className="w-48 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5"
      >
        <DropdownMenuItem
          onClick={() => updateStatus("Completed", id)}
          className="px-4 py-2.5 text-xs text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer focus:bg-slate-50 focus:outline-none"
        >
          Mark as Completed
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => updateStatus("Pending", id)}
          className="px-4 py-2.5 text-xs text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer focus:bg-slate-50 focus:outline-none"
        >
          Mark as Pending
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => updateStatus("In Progress", id)}
          className="px-4 py-2.5 text-xs text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer focus:bg-slate-50 focus:outline-none"
        >
          Mark as In Progress
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
