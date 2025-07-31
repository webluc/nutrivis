import React, { useState } from 'react';
import { User, Store, Inspection, ChecklistStatus, UserRole } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { InspectionScreen } from './components/InspectionScreen';
import { ReportView } from './components/ReportView';
import { ManagementScreen } from './components/ManagementScreen';
import { LogoutIcon, UserCircleIcon, LogoIcon } from './components/icons';
import { RDC216_CHECKLIST, MOCK_USERS, MOCK_STORES, MOCK_INSPECTIONS } from './constants';

type View = 'login' | 'dashboard' | 'inspection' | 'report' | 'management';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('login');
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);

  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [stores, setStores] = useState<Store[]>(MOCK_STORES);
  const [inspections, setInspections] = useState<Inspection[]>(MOCK_INSPECTIONS as Inspection[]);


  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (!user.forcePasswordChange) {
        setCurrentView('dashboard');
    }
  };

  const handlePasswordChange = (newPassword: string) => {
    if (!currentUser) return;

    const updatedUser = {
        ...currentUser,
        password: newPassword,
        forcePasswordChange: false,
    };

    setUsers(prevUsers =>
        prevUsers.map(u => (u.id === updatedUser.id ? updatedUser : u))
    );
    setCurrentUser(updatedUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };
  
  const handleCreateUser = (newUser: Omit<User, 'id'>) => {
      const userWithId = { ...newUser, id: `user_${Date.now()}` };
      setUsers(prev => [...prev, userWithId]);
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
  };
  
  const handleDeleteUser = (userId: string) => {
    // Also remove user from stores they might be assigned to
    setStores(prevStores => prevStores.map(store => ({
        ...store,
        ownerId: store.ownerId === userId ? '' : store.ownerId, // Disassociate if they are owner
        managerIds: store.managerIds.filter(id => id !== userId),
        nutritionistIds: store.nutritionistIds.filter(id => id !== userId),
    })));
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const handleCreateStore = (newStore: Omit<Store, 'id'>) => {
      const storeWithId: Store = { ...newStore, id: `store_${Date.now()}` };

      // Ensure the creator (if nutritionist) is assigned to the store
      if (currentUser?.role === UserRole.Nutritionist) {
          if (!storeWithId.nutritionistIds.includes(currentUser.id)) {
              storeWithId.nutritionistIds.push(currentUser.id);
          }
          // Also update the nutritionist's user object to have the new store ID
          const currentAssigned = currentUser.assignedStoreIds || [];
          if (!currentAssigned.includes(storeWithId.id)) {
              const updatedCurrentUser = {
                  ...currentUser,
                  assignedStoreIds: [...currentAssigned, storeWithId.id]
              };
              setCurrentUser(updatedCurrentUser);
              setUsers(prev => prev.map(u => u.id === updatedCurrentUser.id ? updatedCurrentUser : u));
          }
      }
      setStores(prev => [...prev, storeWithId]);
  };

  const handleUpdateStore = (updatedStore: Store) => {
    setStores(prevStores => prevStores.map(store => store.id === updatedStore.id ? updatedStore : store));
  };

  const handleDeleteStore = (storeId: string) => {
    setStores(prevStores => prevStores.filter(store => store.id !== storeId));
    // Also remove related inspections
    setInspections(prevInspections => prevInspections.filter(i => i.storeId !== storeId));
  };

  const handleStartInspection = (store: Store) => {
    const newInspection: Inspection = {
        id: `insp_${Date.now()}`,
        storeId: store.id,
        storeName: store.name,
        nutritionistId: currentUser!.id,
        status: 'draft',
        startedAt: new Date(),
        endedAt: null,
        checklist: RDC216_CHECKLIST.flatMap(section => section.items).reduce((acc, item) => {
            acc[item.id] = { status: ChecklistStatus.Pendente, comment: '', photoUrls: [] };
            return acc;
        }, {} as Record<string, any>)
    };
    setSelectedInspection(newInspection);
    setCurrentView('inspection');
  };

  const handleSaveDraft = (inspection: Inspection) => {
    setInspections(prev => {
        const existingInspection = prev.find(i => i.id === inspection.id);
        if (existingInspection) {
            return prev.map(i => i.id === inspection.id ? inspection : i);
        }
        return [...prev, inspection];
    });
    setCurrentView('dashboard');
  };

  const handleCompleteInspection = (inspection: Inspection) => {
    const completedInspection = { ...inspection, status: 'completed' as const, endedAt: new Date() };
    
    setInspections(prev => {
        const existingInspection = prev.find(i => i.id === completedInspection.id);
        if (existingInspection) {
            return prev.map(i => i.id === completedInspection.id ? completedInspection : i);
        }
        return [...prev, completedInspection];
    });

    setSelectedInspection(completedInspection);
    setCurrentView('report');
  };
  
  const handleContinueInspection = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setCurrentView('inspection');
  };
  
  const handleViewReport = (inspection: Inspection) => {
      setSelectedInspection(inspection);
      setCurrentView('report');
  }

  const navigateToDashboard = () => {
    setSelectedInspection(null);
    setCurrentView('dashboard');
  };

  const navigateToManagement = () => {
    setCurrentView('management');
  };

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginScreen 
                    users={users}
                    onLogin={handleLogin}
                    onPasswordChange={handlePasswordChange}
                    forcePasswordChange={currentUser?.forcePasswordChange ?? false}
                />;
      case 'dashboard':
        return <Dashboard 
                    user={currentUser!} 
                    onStartInspection={handleStartInspection} 
                    onContinueInspection={handleContinueInspection}
                    onViewReport={handleViewReport}
                    onManage={navigateToManagement}
                    stores={stores}
                    inspections={inspections}
                />;
      case 'inspection':
        return <InspectionScreen inspection={selectedInspection!} onSaveDraft={handleSaveDraft} onComplete={handleCompleteInspection} onBack={navigateToDashboard} />;
      case 'report':
        return <ReportView inspection={selectedInspection!} onBack={navigateToDashboard} />;
      case 'management':
        return <ManagementScreen 
                    currentUser={currentUser!}
                    onBack={navigateToDashboard} 
                    users={users} 
                    stores={stores}
                    onAddUser={handleCreateUser}
                    onUpdateUser={handleUpdateUser}
                    onDeleteUser={handleDeleteUser}
                    onAddStore={handleCreateStore}
                    onUpdateStore={handleUpdateStore}
                    onDeleteStore={handleDeleteStore}
                />;
      default:
        return <LoginScreen 
                    users={users}
                    onLogin={handleLogin}
                    onPasswordChange={handlePasswordChange}
                    forcePasswordChange={currentUser?.forcePasswordChange ?? false}
                />;
    }
  };
  
  const showHeader = currentUser && currentView !== 'login';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {showHeader && (
        <nav className="bg-white shadow-md w-full sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center font-bold text-xl text-indigo-600">
                    <LogoIcon className="h-8 w-auto" />
                    <span className="ml-3">NutriVis</span>
                  </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <UserCircleIcon className="w-6 h-6 text-slate-500" />
                  <span className="ml-2 font-medium text-slate-700">{currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-slate-500 hover:text-indigo-600 transition"
                  aria-label="Sair"
                >
                  <LogoutIcon className="w-6 h-6" />
                  <span className="ml-1 hidden sm:inline">Sair</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;