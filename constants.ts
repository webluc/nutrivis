import { User, Store, UserRole, ChecklistSectionDef } from './types';

export const RDC216_CHECKLIST: ChecklistSectionDef[] = [
    {
        id: '1',
        title: 'Edificação, Instalações, Equipamentos, Móveis e Utensílios',
        items: [
            { id: '1.1', text: 'Localização e estrutura física (livre de focos de insalubridade, acesso independente, etc.).' },
            { id: '1.2', text: 'Pisos, paredes e tetos (material liso, resistente, impermeável e lavável).' },
            { id: '1.3', text: 'Portas e janelas (ajuste aos batentes, proteção contra vetores).' },
            { id: '1.4', text: 'Iluminação e ventilação adequadas.' },
            { id: '1.5', text: 'Instalações sanitárias e vestiários para funcionários, limpos e organizados.' },
        ]
    },
    {
        id: '2',
        title: 'Higienização de Instalações, Equipamentos e Móveis',
        items: [
            { id: '2.1', text: 'Frequência e método de limpeza são adequados.' },
            { id: '2.2', text: 'Produtos de limpeza regularizados e identificados.' },
            { id: '2.3', text: 'Existência de Procedimentos Operacionais Padronizados (POPs) para higienização.' },
        ]
    },
    {
        id: '3',
        title: 'Controle Integrado de Vetores e Pragas Urbanas',
        items: [
            { id: '3.1', text: 'Existência de medidas preventivas e corretivas.' },
            { id: '3.2', text: 'Comprovação de serviço por empresa especializada (se aplicável).' },
        ]
    },
    {
        id: '4',
        title: 'Abastecimento de Água',
        items: [
            { id: '4.1', text: 'Origem da água (rede pública, poço, etc.) é segura.' },
            { id: '4.2', text: 'Higienização do reservatório de água comprovada.' },
            { id: '4.3', text: 'Potabilidade da água atestada por laudos de análise.' },
        ]
    },
    {
        id: '5',
        title: 'Manejo dos Resíduos',
        items: [
            { id: '5.1', text: 'Coletores de lixo com tampa e acionamento não manual.' },
            { id: '5.2', text: 'Frequência de retirada do lixo é adequada.' },
            { id: '5.3', text: 'Local de armazenamento do lixo externo e separado da área de preparo.' },
        ]
    },
    {
        id: '6',
        title: 'Manipuladores',
        items: [
            { id: '6.1', text: 'Controle de saúde dos manipuladores (ASO) em dia.' },
            { id: '6.2', text: 'Higiene pessoal (uniformes limpos, ausência de adornos, etc.) adequada.' },
            { id: '6.3', text: 'Capacitação em Boas Práticas realizada e documentada.' },
        ]
    },
    {
        id: '7',
        title: 'Matérias-Primas, Ingredientes e Embalagens',
        items: [
            { id: '7.1', text: 'Recebimento inspecionado quanto a integridade e temperatura.' },
            { id: '7.2', text: 'Armazenamento em local adequado, organizado e identificado.' },
        ]
    },
    {
        id: '8',
        title: 'Preparação do Alimento',
        items: [
            { id: '8.1', text: 'Higienização de hortifrutigranjeiros realizada corretamente.' },
            { id: '8.2', text: 'Controle de temperatura nas etapas de preparo (cozimento, resfriamento).' },
            { id: '8.3', text: 'Prevenção da contaminação cruzada.' },
        ]
    },
    {
        id: '9',
        title: 'Armazenamento e Transporte do Alimento Preparado',
        items: [
            { id: '9.1', text: 'Identificação do alimento (nome, data de preparo, validade).' },
            { id: '9.2', text: 'Controle de temperatura (quente >60°C, frio <5°C).' },
            { id: '9.3', text: 'Condições do transporte (veículo limpo e adequado).' },
        ]
    },
    {
        id: '10',
        title: 'Exposição ao Consumo do Alimento Preparado',
        items: [
            { id: '10.1', text: 'Condições do balcão de distribuição (proteção, temperatura).' },
            { id: '10.2', text: 'Utensílios de serviço (colheres, pegadores) adequados e limpos.' },
        ]
    },
    {
        id: '11',
        title: 'Documentação e Registro',
        items: [
            { id: '11.1', text: 'Existência e aplicação do Manual de Boas Práticas.' },
            { id: '11.2', text: 'Existência e aplicação dos Procedimentos Operacionais Padronizados (POPs).' },
        ]
    },
];

export const MOCK_USERS: User[] = [
    { id: 'admin01', name: 'Admin Geral', email: 'admin@vistoria.app', role: UserRole.Admin, password: 'admin', forcePasswordChange: false },
];

export const MOCK_STORES: Store[] = [];

export const MOCK_INSPECTIONS: any[] = [];