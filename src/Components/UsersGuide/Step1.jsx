import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import Button from "@mui/joy/Button";

const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl shadow-xl bg-white ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Step1 = ({handleNext}) => {
  const primaryColor = '#5E1675';
  
  const sections = [
    {
      icon: <ShieldCheck color={primaryColor} size={48} />,
      title: "Qu'est-ce que le 2FA ?",
      description: "L'authentification à deux facteurs est une couche de sécurité supplémentaire qui protège votre compte en demandant deux types différents de preuves d'identité."
    },
    {
      icon: <Lock color={primaryColor} size={48} />,
      title: "Comment ça fonctionne ?",
      description: "Après avoir entré votre mot de passe, vous devez fournir une seconde preuve d'authentification, généralement via votre appareil personnel."
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <h1 
            className="text-4xl font-bold text-center" 
            style={{color: primaryColor}}
          >
            Sécurité Renforcée avec 2FA
          </h1>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="w-1/2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" className="w-full rounded-xl shadow-lg">
                <rect width="500" height="300" fill="#F4F4F4"/>
                <rect x="100" y="120" width="150" height="100" rx="10" fill="white" stroke="#5E1675" strokeWidth="3"/>
                <rect x="120" y="140" width="110" height="60" fill="#E0E0E0"/>
                <rect x="300" y="140" width="80" height="130" rx="10" fill="white" stroke="#5E1675" strokeWidth="3"/>
                <circle cx="340" cy="230" r="15" fill="#E0E0E0"/>
                <path d="M250,170 Q320,130 300,180" fill="none" stroke="#5E1675" strokeWidth="3"/>
              </svg>
            </div>

            <div className="w-1/2 space-y-6">
              {sections.map((section, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {section.icon}
                    <h2 className="ml-4 text-2xl font-semibold" style={{color: primaryColor}}>
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 text-base">
                    {section.description}
                  </p>
                </div>
              ))}

                </div>
 <div style={{ display: "flex", justifyContent: "flex-end", width:750, marginTop: 20 }}>
 <Button
   onClick={handleNext}
   variant="solid"
   color="primary"
   style={{backgroundColor:"#5E1675"}}
 >
   Commencer
 </Button>
            </div>
          </div>
        </CardContent>
      </Card>
 
</div>  );
};

export default Step1;