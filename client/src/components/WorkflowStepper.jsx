import React from 'react';
import { Send, Search, Cpu, ShieldAlert, Blocks, CheckCircle2, ArrowRight } from 'lucide-react';

export default function WorkflowStepper({
  currentStep = 1, // 1 to 5
  isLoading = false,
  scanResult = null,
  onOpenReportModal
}) {
  // Determine effective step
  let activeStep = 1;
  if (isLoading) {
    activeStep = 2; // Investigating & Analyzing
  } else if (scanResult) {
    activeStep = 4; // Risk Assessed, Ready to Report & Verify
  }

  const steps = [
    {
      num: 1,
      title: 'Submit',
      subtitle: 'Link / Domain / Email / SMS',
      icon: Send,
      desc: 'A user pastes a suspicious link, submits a domain, or provides a suspicious email or message.'
    },
    {
      num: 2,
      title: 'Investigate',
      subtitle: 'DNS, TLS, CT Logs & Feeds',
      icon: Search,
      desc: 'The platform collects available domain information, certificate details, threat intelligence, and relevant technical indicators.'
    },
    {
      num: 3,
      title: 'Analyse',
      subtitle: 'Cyber Checks & AI Correlation',
      icon: Cpu,
      desc: 'Cybersecurity checks identify suspicious patterns, while AI correlates the findings and generates an understandable explanation.'
    },
    {
      num: 4,
      title: 'Assess Risk',
      subtitle: 'Structured Findings & Precaution',
      icon: ShieldAlert,
      desc: 'The platform provides a structured report describing the identified threats, their supporting evidence, and recommended precautions.'
    },
    {
      num: 5,
      title: 'Report & Verify',
      subtitle: 'On-Chain Web3 Commitment',
      icon: Blocks,
      desc: 'Users can submit relevant incidents to the threat intelligence repository, where cryptographic commitments are recorded on-chain for independent verification.'
    }
  ];

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-4 sm:p-5 shadow-card-dark space-y-3 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#143838]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30">
              SECTION 5 ARCHITECTURE
            </span>
            <h3 className="text-sm font-bold text-white tracking-wide">
              5-Step End-to-End Workflow & User Experience
            </h3>
          </div>
          <p className="text-[11px] text-[#80a4a2] mt-0.5">
            A simple, understandable 5-stage pipeline uniting AI, Cybersecurity, and Web3
          </p>
        </div>

        {scanResult && onOpenReportModal && (
          <button
            onClick={onOpenReportModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#00f2c3]/15 hover:bg-[#00f2c3]/25 border border-[#00f2c3]/40 text-[#00f2c3] text-xs font-bold transition-all shadow-neon-sm self-start sm:self-auto"
          >
            <Blocks className="w-3.5 h-3.5" />
            <span>Step 5: Anchor On-Chain</span>
          </button>
        )}
      </div>

      {/* 5 Stepper Cards in a Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {steps.map((st) => {
          const Icon = st.icon;
          const isCompleted = activeStep > st.num || (activeStep === 4 && st.num <= 4);
          const isCurrent = activeStep === st.num || (isLoading && (st.num === 2 || st.num === 3));

          return (
            <div
              key={st.num}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'bg-[#061414] border-[#00f2c3] shadow-neon-sm'
                  : isCompleted
                  ? 'bg-[#061414]/80 border-[#10b981]/50'
                  : 'bg-[#061414]/40 border-[#143838]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? 'bg-[#00f2c3] text-[#041513] animate-pulse'
                        : isCompleted
                        ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                        : 'bg-[#0b2020] text-[#5c8280] border border-[#174242]'
                    }`}
                  >
                    {isCompleted && !isCurrent ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span>{st.num}</span>
                    )}
                  </div>
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent
                        ? 'text-[#00f2c3]'
                        : isCompleted
                        ? 'text-[#10b981]'
                        : 'text-[#5c8280]'
                    }`}
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] text-[#5c8280] font-bold">STEP {st.num}:</span>
                    <h4
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-[#00f2c3]'
                          : isCompleted
                          ? 'text-white'
                          : 'text-[#80a4a2]'
                      }`}
                    >
                      {st.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-[#80a4a2] truncate">{st.subtitle}</p>
                </div>
              </div>

              <p className="text-[9.5px] text-[#5c8280] mt-2 line-clamp-2 leading-tight">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
