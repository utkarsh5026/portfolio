import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import React, { memo } from "react";

interface CertificateProps {
  name: string;
}

/**
 * Certificate component displays a certificate image with a decorative design.
 * It uses Framer Motion for animations and is memoized for performance optimization.
 *
 * @component
 * @param {CertificateProps} props - The properties for the Certificate component.
 * @param {string} props.name - The name associated with the certificate, used for the alt text of the image.
 *
 * @returns {JSX.Element} A styled certificate component with animations.
 *
 * @example
 * <Certificate name="John Doe" />
 */
const Certificate: React.FC<CertificateProps> = memo(({ name }) => {
  return (
    <div className="xl:w-1/2">
      <motion.div
        className="relative mx-auto max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-ctp-peach to-ctp-blue opacity-50 rounded-xl blur-sm" />
        <div className="absolute -inset-1 bg-ctp-crust rounded-xl" />

        <div className="relative rounded-lg overflow-hidden border-2 border-ctp-surface0">
          <img
            src="skoda-certificate.jpg"
            alt={`${name} Certificate`}
            className="w-full h-auto object-cover z-10 relative"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-ctp-peach/5 via-white/5 to-ctp-blue/5 z-20" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--ctp-blue),_transparent_70%)]" />
        </div>

        <div className="absolute -bottom-3 -right-3 z-30">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-ctp-peach to-ctp-blue rounded-full blur-sm" />
            <div className="relative p-2 bg-ctp-crust rounded-full border border-ctp-surface0">
              <FaStar className="w-5 h-5 text-ctp-yellow" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

export default Certificate;
