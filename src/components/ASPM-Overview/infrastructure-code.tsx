'use client';

import { motion } from 'framer-motion';
import { Cloud, AlertTriangle, CheckCircle } from 'lucide-react';

export default function InfrastructureCode() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Infrastructure as Code Security</h3>

      { /* Before/After Code Comparison */ }
      <div className="grid md:grid-cols-2 gap-4">
        { /* Detected Misconfiguration */ }
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#8220ff]" />
            <h4 className="font-semibold text-[#6010cc]">Detected Misconfiguration</h4>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
            <div className="text-blue-400">resource "aws_s3_bucket" "example" { '{' }</div>
            <div className="ml-2 text-green-400">bucket = "my-bucket"</div>
            <div className="ml-2 text-gray-400"></div>
            <div className="ml-2 text-[#a370ff]"># ❌ Public read access (HIGH RISK)</div>
            <div className="ml-2 text-[#a370ff]">acl = "public-read"</div>
            <div className="ml-2 text-gray-400"></div>
            <div className="ml-2 text-[#a370ff]"># ❌ No encryption (MEDIUM RISK)</div>
            <div className="ml-2 text-gray-500"># encryption { '{' }</div>
            <div className="ml-4 text-gray-500"># rule { '{' }</div>
            <div className="ml-6 text-gray-500"># apply_server_side_encryption_by_default { '{' }</div>
            <div className="ml-8 text-gray-500"># sse_algorithm = "AES256"</div>
            <div className="ml-6 text-gray-500"># { '}' }</div>
            <div className="ml-4 text-gray-500"># { '}' }</div>
            <div className="ml-2 text-gray-500"># { '}' }</div>
            <div className="text-blue-400">{ '}' }</div>
          </div>
        </motion.div>

        { /* Remediation Suggested */ }
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#00c951]" />
            <h4 className="font-semibold text-[#00a040]">Remediation Suggested</h4>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
            <div className="text-blue-400">resource "aws_s3_bucket" "example" { '{' }</div>
            <div className="ml-2 text-green-400">bucket = "my-bucket"</div>
            <div className="ml-2 text-gray-400"></div>
            <div className="ml-2 text-green-400"># ✅ Private access</div>
            <div className="ml-2 text-green-400">acl = "private"</div>
            <div className="ml-2 text-gray-400"></div>
            <div className="ml-2 text-green-400"># ✅ Encryption enabled</div>
            <div className="ml-2 text-green-400">server_side_encryption_configuration { '{' }</div>
            <div className="ml-4 text-green-400">rule { '{' }</div>
            <div className="ml-6 text-green-400">apply_server_side_encryption_by_default { '{' }</div>
            <div className="ml-8 text-green-400">sse_algorithm = "AES256"</div>
            <div className="ml-6 text-green-400">{ '}' }</div>
            <div className="ml-4 text-green-400">{ '}' }</div>
            <div className="ml-2 text-green-400">{ '}' }</div>
            <div className="text-blue-400">{ '}' }</div>
          </div>
        </motion.div>
      </div>

      { /* Supported Platforms */ }
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Supported Platforms:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          { ['Terraform', 'CloudFormation', 'Kubernetes', 'Docker'].map((platform, index) => (
            <motion.div
              key={platform}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2 p-2 bg-[#f5eeff] rounded-lg"
            >
              <Cloud className="w-4 h-4 text-[#8220ff]" />
              <span className="text-sm font-medium text-[#6010cc]">{ platform }</span>
            </motion.div>
          )) }
        </div>
      </div>
    </div>
  );
}
