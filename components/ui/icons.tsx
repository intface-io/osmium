import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  X,
} from "lucide-react";

export type IconKeys = keyof typeof Icons;

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  settings: Settings,
  page: FileText,
  media: Image,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  add: Plus,
  warning: AlertTriangle,
  moreVertical: MoreVertical,
  file: File,
  check: Check,

  // Social providers
  gitHub: (props: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
  slack: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.5 10C13.67 10 13 9.33 13 8.5V3.5C13 2.67 13.67 2 14.5 2C15.33 2 16 2.67 16 3.5V8.5C16 9.33 15.33 10 14.5 10Z"
        fill="#E01E5A"
      />
      <path
        d="M8.5 10H3.5C2.67 10 2 9.33 2 8.5C2 7.67 2.67 7 3.5 7H8.5C9.33 7 10 7.67 10 8.5C10 9.33 9.33 10 8.5 10Z"
        fill="#E01E5A"
      />
      <path
        d="M8.5 16C7.67 16 7 15.33 7 14.5V9.5C7 8.67 7.67 8 8.5 8C9.33 8 10 8.67 10 9.5V14.5C10 15.33 9.33 16 8.5 16Z"
        fill="#36C5F0"
      />
      <path
        d="M14.5 16H9.5C8.67 16 8 15.33 8 14.5C8 13.67 8.67 13 9.5 13H14.5C15.33 13 16 13.67 16 14.5C16 15.33 15.33 16 14.5 16Z"
        fill="#36C5F0"
      />
      <path
        d="M20.5 14.5C20.5 15.33 19.83 16 19 16C18.17 16 17.5 15.33 17.5 14.5V9.5C17.5 8.67 18.17 8 19 8C19.83 8 20.5 8.67 20.5 9.5V14.5Z"
        fill="#2EB67D"
      />
      <path
        d="M19 8H14C13.17 8 12.5 7.33 12.5 6.5C12.5 5.67 13.17 5 14 5H19C19.83 5 20.5 5.67 20.5 6.5C20.5 7.33 19.83 8 19 8Z"
        fill="#2EB67D"
      />
      <path
        d="M9.5 22C8.67 22 8 21.33 8 20.5C8 19.67 8.67 19 9.5 19H14.5C15.33 19 16 19.67 16 20.5C16 21.33 15.33 22 14.5 22H9.5Z"
        fill="#ECB22E"
      />
      <path
        d="M14.5 20.5V15.5C14.5 14.67 15.17 14 16 14C16.83 14 17.5 14.67 17.5 15.5V20.5C17.5 21.33 16.83 22 16 22C15.17 22 14.5 21.33 14.5 20.5Z"
        fill="#ECB22E"
      />
    </svg>
  ),
};
