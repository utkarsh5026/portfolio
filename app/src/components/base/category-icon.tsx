import {
  Layers,
  // Frontend & UI
  Globe,
  Palette,
  Smartphone,
  Layout,
  Eye,
  // Backend & APIs
  Server,
  Database,
  Cloud,
  Zap,
  Shield,
  // Languages & Frameworks
  Code2,
  Terminal,
  FileCode,
  Cpu,
  // Tools & DevOps
  Wrench,
  Settings,
  Package,
  GitBranch,
  // Analytics & Data
  BarChart3,
  TrendingUp,
  PieChart,
  // Storage & Cache
  HardDrive,
  Archive,
  // Testing & Quality
  TestTube,
  CheckCircle,
  Bug,
  // Mobile & Native
  Monitor,
  TabletSmartphone,
  // Machine Learning & AI
  Brain,
  Bot,
  // Communication & Real-time
  MessageSquare,
  Radio,
  Wifi,
  // Payment & Commerce
  CreditCard,
  ShoppingCart,
  // Media & Content
  Image,
  Video,
  Music,
  // Security & Auth
  Lock,
  Key,
  UserCheck,
  // Monitoring & Logging
  Activity,
  Search,
  AlertCircle,
} from "lucide-react";

const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();

  // Frontend & UI Technologies
  if (
    categoryLower.includes("frontend") ||
    categoryLower.includes("ui") ||
    categoryLower.includes("interface") ||
    categoryLower.includes("client")
  ) {
    return Globe;
  }
  if (
    categoryLower.includes("styling") ||
    categoryLower.includes("css") ||
    categoryLower.includes("design") ||
    categoryLower.includes("theme")
  ) {
    return Palette;
  }
  if (
    categoryLower.includes("mobile") ||
    categoryLower.includes("ios") ||
    categoryLower.includes("android") ||
    categoryLower.includes("app")
  ) {
    return Smartphone;
  }
  if (
    categoryLower.includes("layout") ||
    categoryLower.includes("component") ||
    categoryLower.includes("ui/ux")
  ) {
    return Layout;
  }
  if (
    categoryLower.includes("visualization") ||
    categoryLower.includes("graphics") ||
    categoryLower.includes("visual")
  ) {
    return Eye;
  }

  // Backend & Infrastructure
  if (
    categoryLower.includes("backend") ||
    categoryLower.includes("server") ||
    categoryLower.includes("api") ||
    categoryLower.includes("service")
  ) {
    return Server;
  }
  if (
    categoryLower.includes("database") ||
    categoryLower.includes("db") ||
    categoryLower.includes("storage") ||
    categoryLower.includes("data")
  ) {
    return Database;
  }
  if (
    categoryLower.includes("cloud") ||
    categoryLower.includes("aws") ||
    categoryLower.includes("azure") ||
    categoryLower.includes("gcp") ||
    categoryLower.includes("hosting") ||
    categoryLower.includes("deployment")
  ) {
    return Cloud;
  }
  if (
    categoryLower.includes("performance") ||
    categoryLower.includes("optimization") ||
    categoryLower.includes("speed")
  ) {
    return Zap;
  }
  if (
    categoryLower.includes("security") ||
    categoryLower.includes("auth") ||
    categoryLower.includes("authentication") ||
    categoryLower.includes("authorization")
  ) {
    return Shield;
  }

  // Languages & Frameworks
  if (
    categoryLower.includes("language") ||
    categoryLower.includes("programming") ||
    categoryLower.includes("scripting")
  ) {
    return Code2;
  }
  if (
    categoryLower.includes("framework") ||
    categoryLower.includes("library") ||
    categoryLower.includes("runtime")
  ) {
    return FileCode;
  }
  if (
    categoryLower.includes("terminal") ||
    categoryLower.includes("cli") ||
    categoryLower.includes("command") ||
    categoryLower.includes("shell")
  ) {
    return Terminal;
  }
  if (
    categoryLower.includes("system") ||
    categoryLower.includes("low-level") ||
    categoryLower.includes("native")
  ) {
    return Cpu;
  }

  // Development Tools & DevOps
  if (
    categoryLower.includes("tool") ||
    categoryLower.includes("utility") ||
    categoryLower.includes("development")
  ) {
    return Wrench;
  }
  if (
    categoryLower.includes("configuration") ||
    categoryLower.includes("config") ||
    categoryLower.includes("environment") ||
    categoryLower.includes("setup")
  ) {
    return Settings;
  }
  if (
    categoryLower.includes("package") ||
    categoryLower.includes("dependency") ||
    categoryLower.includes("bundler") ||
    categoryLower.includes("build")
  ) {
    return Package;
  }
  if (
    categoryLower.includes("version") ||
    categoryLower.includes("git") ||
    categoryLower.includes("source control") ||
    categoryLower.includes("vcs")
  ) {
    return GitBranch;
  }

  // Analytics & Data Science
  if (
    categoryLower.includes("analytics") ||
    categoryLower.includes("metrics") ||
    categoryLower.includes("tracking") ||
    categoryLower.includes("insights")
  ) {
    return BarChart3;
  }
  if (
    categoryLower.includes("statistics") ||
    categoryLower.includes("reporting") ||
    categoryLower.includes("dashboard")
  ) {
    return TrendingUp;
  }
  if (
    categoryLower.includes("chart") ||
    categoryLower.includes("graph") ||
    categoryLower.includes("visualization")
  ) {
    return PieChart;
  }

  // Storage & Caching
  if (
    categoryLower.includes("cache") ||
    categoryLower.includes("redis") ||
    categoryLower.includes("memory") ||
    categoryLower.includes("session")
  ) {
    return Archive;
  }
  if (
    categoryLower.includes("file") ||
    categoryLower.includes("storage") ||
    categoryLower.includes("disk")
  ) {
    return HardDrive;
  }

  // Testing & Quality Assurance
  if (
    categoryLower.includes("testing") ||
    categoryLower.includes("test") ||
    categoryLower.includes("qa") ||
    categoryLower.includes("quality")
  ) {
    return TestTube;
  }
  if (
    categoryLower.includes("validation") ||
    categoryLower.includes("verification") ||
    categoryLower.includes("check")
  ) {
    return CheckCircle;
  }
  if (
    categoryLower.includes("debug") ||
    categoryLower.includes("error") ||
    categoryLower.includes("bug")
  ) {
    return Bug;
  }

  // Platform & Device Specific
  if (
    categoryLower.includes("desktop") ||
    categoryLower.includes("electron") ||
    categoryLower.includes("native")
  ) {
    return Monitor;
  }
  if (
    categoryLower.includes("tablet") ||
    categoryLower.includes("responsive") ||
    categoryLower.includes("cross-platform")
  ) {
    return TabletSmartphone;
  }

  // AI & Machine Learning
  if (
    categoryLower.includes("ai") ||
    categoryLower.includes("artificial") ||
    categoryLower.includes("machine learning") ||
    categoryLower.includes("ml")
  ) {
    return Brain;
  }
  if (
    categoryLower.includes("bot") ||
    categoryLower.includes("automation") ||
    categoryLower.includes("intelligent")
  ) {
    return Bot;
  }

  // Communication & Real-time
  if (
    categoryLower.includes("messaging") ||
    categoryLower.includes("chat") ||
    categoryLower.includes("communication")
  ) {
    return MessageSquare;
  }
  if (
    categoryLower.includes("websocket") ||
    categoryLower.includes("realtime") ||
    categoryLower.includes("real-time") ||
    categoryLower.includes("live")
  ) {
    return Radio;
  }
  if (
    categoryLower.includes("network") ||
    categoryLower.includes("connection") ||
    categoryLower.includes("protocol")
  ) {
    return Wifi;
  }

  // E-commerce & Payment
  if (
    categoryLower.includes("payment") ||
    categoryLower.includes("billing") ||
    categoryLower.includes("stripe") ||
    categoryLower.includes("paypal")
  ) {
    return CreditCard;
  }
  if (
    categoryLower.includes("commerce") ||
    categoryLower.includes("shop") ||
    categoryLower.includes("store") ||
    categoryLower.includes("ecommerce")
  ) {
    return ShoppingCart;
  }

  // Media & Content
  if (
    categoryLower.includes("image") ||
    categoryLower.includes("photo") ||
    categoryLower.includes("picture") ||
    categoryLower.includes("graphic")
  ) {
    return Image;
  }
  if (
    categoryLower.includes("video") ||
    categoryLower.includes("stream") ||
    categoryLower.includes("media")
  ) {
    return Video;
  }
  if (
    categoryLower.includes("audio") ||
    categoryLower.includes("sound") ||
    categoryLower.includes("music")
  ) {
    return Music;
  }

  // Security & Authentication
  if (
    categoryLower.includes("encryption") ||
    categoryLower.includes("crypto") ||
    categoryLower.includes("secure")
  ) {
    return Lock;
  }
  if (
    categoryLower.includes("key") ||
    categoryLower.includes("token") ||
    categoryLower.includes("credential")
  ) {
    return Key;
  }
  if (
    categoryLower.includes("user") ||
    categoryLower.includes("identity") ||
    categoryLower.includes("profile")
  ) {
    return UserCheck;
  }

  // Monitoring & Observability
  if (
    categoryLower.includes("monitoring") ||
    categoryLower.includes("observability") ||
    categoryLower.includes("telemetry")
  ) {
    return Activity;
  }
  if (
    categoryLower.includes("search") ||
    categoryLower.includes("indexing") ||
    categoryLower.includes("elasticsearch")
  ) {
    return Search;
  }
  if (
    categoryLower.includes("logging") ||
    categoryLower.includes("error tracking") ||
    categoryLower.includes("alert")
  ) {
    return AlertCircle;
  }

  // Default fallback
  return Layers;
};

export default getCategoryIcon;
