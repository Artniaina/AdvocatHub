import React, { useState } from 'react';
import { Calendar, User, Briefcase, Building } from 'lucide-react';

const FicheAvocat = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Tabs */}
      <div className="w-full mb-8">
        <div className="grid w-full grid-cols-3 border rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center justify-center gap-2 p-3 ${
              activeTab === 'personal'
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5" />
            Informations personnelles
          </button>
          <button
            onClick={() => setActiveTab('professional')}
            className={`flex items-center justify-center gap-2 p-3 ${
              activeTab === 'professional'
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Informations professionnelles
          </button>
          <button
            onClick={() => setActiveTab('office')}
            className={`flex items-center justify-center gap-2 p-3 ${
              activeTab === 'office'
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Building className="w-5 h-5" />
            Étude
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* Personal Information */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nom</label>
                <input
                  type="text"
                  defaultValue="AATTI"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Prénom</label>
                <input
                  type="text"
                  defaultValue="Ghizlane"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Genre M/F</label>
                <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>F</option>
                  <option>M</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Nationalité</label>
                <input
                  type="text"
                  defaultValue="France"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Date de naissance</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="01-01-1990"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Adresse Privée</label>
                <textarea 
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Téléphone</label>
                  <div className="flex gap-2">
                    <select className="w-40 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Luxembourg (+352)</option>
                    </select>
                    <input
                      type="tel"
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Mobile</label>
                  <div className="flex gap-2">
                    <select className="w-40 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Luxembourg (+352)</option>
                    </select>
                    <input
                      type="tel"
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">E-mail privé</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">IBAN</label>
                <input
                  type="text"
                  defaultValue="FR76 1131 5000 0112 3"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">BIC</label>
                <input
                  type="text"
                  defaultValue="CMCIFRPP"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Professional Information */}
        {activeTab === 'professional' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Identifiant interne</label>
                <input
                  type="text"
                  defaultValue="1"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Statut</label>
                <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Inscrit</option>
                </select>
              </div>
              <div className="flex gap-4">
                <div className="w-24">
                  <label className="text-sm font-medium mb-1 block">Liste</label>
                  <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>4</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Dispense AJ</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Barreau</label>
                <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Luxembourg</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">E-mail barreau</label>
                <input
                  type="email"
                  defaultValue="ghizlane.aatti@barreau.lu"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">E-mail professionnel</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Langues parlées</label>
                <input
                  type="text"
                  defaultValue="Allemand, Français, Luxembourgeois"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Titre professionnel d'origine</label>
                <input
                  type="text"
                  defaultValue="Rechtsanwalt (Germany)"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Office Information */}
        {activeTab === 'office' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Dénomination</label>
              <input
                type="text"
                defaultValue="Allen & Overy GP"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Numéro voie</label>
              <input
                type="text"
                defaultValue="5"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Adresse</label>
              <input
                type="text"
                defaultValue="avenue J.-F. Kennedy"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Code Postal</label>
              <input
                type="text"
                defaultValue="L-1855"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Localité</label>
              <input
                type="text"
                defaultValue="Luxembourg"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Site web</label>
              <input
                type="url"
                defaultValue="www.allenovery.com"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FicheAvocat;