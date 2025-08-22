# 💰 Finance AI - Gestão Financeira Inteligente

Uma aplicação moderna de gestão financeira pessoal com recursos de inteligência artificial para análise e insights sobre suas finanças.

![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.21.1-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai)

## 🚀 Funcionalidades

### 📊 Dashboard Inteligente
- **Visão Geral das Finanças**: Resumo completo de receitas, despesas e investimentos
- **Gráficos Interativos**: Visualizações em tempo real com Recharts
- **Filtros por Período**: Análise mensal personalizada
- **Últimas Transações**: Histórico recente de movimentações

### 🤖 Relatórios de IA
- **Análise Inteligente**: Insights personalizados sobre suas finanças
- **Dicas Personalizadas**: Recomendações para melhorar sua saúde financeira
- **Tendências Identificadas**: Padrões de gastos e oportunidades de economia
- **Relatórios Detalhados**: Análise por categoria e tipo de transação

### 💳 Gestão de Transações
- **Categorização Inteligente**: 9 categorias principais (Moradia, Transporte, Alimentação, etc.)
- **Múltiplos Métodos de Pagamento**: Cartão de crédito, débito, PIX, transferência, etc.
- **Tipos de Transação**: Depósitos, Despesas e Investimentos
- **Interface Intuitiva**: Adição, edição e exclusão de transações

### 🔐 Sistema de Autenticação
- **Autenticação Segura**: Integração com Clerk
- **Proteção de Rotas**: Middleware de autenticação
- **Perfis de Usuário**: Dados personalizados por usuário

### 💎 Sistema de Assinatura
- **Plano Básico (Gratuito)**: 10 transações por mês
- **Plano Premium (R$ 19/mês)**: Transações ilimitadas + Relatórios de IA
- **Integração Stripe**: Pagamentos seguros e automatizados

## 🎨 Figma
- https://www.figma.com/design/IogQ5fM9V9si2zSulcKhfU/FSW-Finance


## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Radix UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Recharts** - Gráficos interativos
- **Lucide React** - Ícones modernos

### Backend
- **Prisma** - ORM para PostgreSQL
- **Clerk** - Autenticação e gerenciamento de usuários
- **Stripe** - Processamento de pagamentos
- **OpenAI GPT-4** - Análise inteligente de dados

### Banco de Dados
- **PostgreSQL** - Banco de dados relacional
- **Prisma Migrations** - Controle de versão do banco

### DevOps & Qualidade
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **Husky** - Git hooks
- **Lint-staged** - Linting em commits

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL
- Conta no Clerk
- Conta no Stripe
- Chave da API OpenAI (opcional)

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/Joaovictormartin/nextjs-fullstackweek-finance-ia.git
cd nextjs-fullstackweek-finance-ia
```

### 2. Instale as dependências
```bash
yarn install
# ou
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=
STRIPE_PREMIUM_PLAN_PRICE_ID=
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# OpenAI (opcional)
OPENAI_API_KEY=
```

### 4. Configure o banco de dados
```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrações
npx prisma migrate dev
```

### 5. Execute o projeto
```bash
# Desenvolvimento
yarn dev
# ou
npm run dev

# Produção
yarn build
yarn start
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.



## 🔧 Configuração dos Serviços

### Clerk (Autenticação)
1. Crie uma conta em [clerk.com](https://clerk.com)
2. Configure um novo projeto
3. Adicione as chaves no `.env.local`

### Stripe (Pagamentos)
1. Crie uma conta em [stripe.com](https://stripe.com)
2. Configure os produtos e preços
3. Configure o webhook para `/api/webhooks/stripe`
4. Adicione as chaves no `.env.local`

### OpenAI (IA)
1. Crie uma conta em [openai.com](https://openai.com)
2. Gere uma API key
3. Adicione a chave no `.env.local`


---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
