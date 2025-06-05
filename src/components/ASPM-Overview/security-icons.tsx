import {
  ShieldAlert,
  ShieldCheck,
  Code,
  Package,
  AlertTriangle,
  GitBranch,
  Workflow,
  FileCheck,
  FileCode,
  FileText,
  Cpu,
  Github,
  GitlabIcon as GitlabLogo,
  Database,
  Cloud,
  Ticket,
  Boxes,
  LayoutGrid,
  ClipboardCheck,
} from 'lucide-react';

interface SecurityIconsProps {
  type: string;
}

export const SecurityIcons = ({ type }: SecurityIconsProps) => {
  const iconMap = {
    // Security Tool Connectors
    sast: <Code className="w-full h-full p-1 text-blue-600" />,
    secret: <ShieldAlert className="w-full h-full p-1 text-red-600" />,
    sca: <Package className="w-full h-full p-1 text-green-600" />,
    container: <Cpu className="w-full h-full p-1 text-purple-600" />,
    threat: <AlertTriangle className="w-full h-full p-1 text-orange-600" />,
    scmSecurity: <GitBranch className="w-full h-full p-1 text-indigo-600" />,
    cicd: <Workflow className="w-full h-full p-1 text-cyan-600" />,
    license: <FileCheck className="w-full h-full p-1 text-amber-600" />,
    iac: <FileCode className="w-full h-full p-1 text-teal-600" />,
    sbom: <FileText className="w-full h-full p-1 text-gray-600" />,
    plexicusNative: <ShieldCheck className="w-full h-full p-1 text-blue-600" />,

    // Platform & Infrastructure Integrations
    scm: <GitBranch className="w-full h-full p-1 text-indigo-700" />,
    registry: <Boxes className="w-full h-full p-1 text-purple-700" />,
    cloud: <Cloud className="w-full h-full p-1 text-blue-700" />,
    ticket: <Ticket className="w-full h-full p-1 text-amber-700" />,

    // SCM Platform Tools
    github: <Github className="w-full h-full p-1 text-gray-800" />,
    gitlab: <GitlabLogo className="w-full h-full p-1 text-orange-600" />,
    bitbucket: <Code className="w-full h-full p-1 text-blue-500" />,

    // Container Registry Tools
    ecr: <Database className="w-full h-full p-1 text-orange-500" />,
    acr: <Database className="w-full h-full p-1 text-blue-500" />,

    // Cloud Platform Tools
    aws: <Cloud className="w-full h-full p-1 text-orange-500" />,
    azure: <Cloud className="w-full h-full p-1 text-blue-500" />,
    gcp: <Cloud className="w-full h-full p-1 text-red-500" />,

    // Issue Tracking Tools
    jira: <ClipboardCheck className="w-full h-full p-1 text-blue-500" />,
    asana: <LayoutGrid className="w-full h-full p-1 text-purple-500" />,
  };

  return (
    <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
      { iconMap[type] || <ShieldCheck className="w-full h-full p-1 text-blue-600" /> }
    </div>
  );
};
