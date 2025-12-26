# ============================================
# SCRIPT DE INICIALIZAÇÃO GIT + GITHUB
# Projeto: Flowcorte
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   INICIALIZAÇÃO GIT + GITHUB" -ForegroundColor Cyan
Write-Host "   Projeto: Flowcorte v1.1.0" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
Write-Host "Verificando Git..." -ForegroundColor Yellow
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git não encontrado!" -ForegroundColor Red
    Write-Host "Baixe em: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Git instalado" -ForegroundColor Green
Write-Host ""

# Verificar se já é um repositório Git
if (Test-Path .git) {
    Write-Host "⚠️  Este diretório já é um repositório Git" -ForegroundColor Yellow
    $resposta = Read-Host "Deseja reinicializar? (s/N)"
    if ($resposta -eq "s" -or $resposta -eq "S") {
        Remove-Item -Recurse -Force .git
        Write-Host "✅ Repositório Git removido" -ForegroundColor Green
    } else {
        Write-Host "Operação cancelada" -ForegroundColor Yellow
        exit 0
    }
}

# Configurar Git (se necessário)
Write-Host "Configurando Git..." -ForegroundColor Yellow
$gitName = git config --global user.name
$gitEmail = git config --global user.email

if (!$gitName) {
    $nome = Read-Host "Digite seu nome"
    git config --global user.name "$nome"
    Write-Host "✅ Nome configurado: $nome" -ForegroundColor Green
} else {
    Write-Host "✅ Nome já configurado: $gitName" -ForegroundColor Green
}

if (!$gitEmail) {
    $email = Read-Host "Digite seu email (mesmo do GitHub)"
    git config --global user.email "$email"
    Write-Host "✅ Email configurado: $email" -ForegroundColor Green
} else {
    Write-Host "✅ Email já configurado: $gitEmail" -ForegroundColor Green
}
Write-Host ""

# Inicializar repositório
Write-Host "Inicializando repositório Git..." -ForegroundColor Yellow
git init
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Repositório inicializado" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao inicializar repositório" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Adicionar arquivos
Write-Host "Adicionando arquivos ao Git..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Arquivos adicionados" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao adicionar arquivos" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Verificar status
Write-Host "Status do repositório:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Fazer commit inicial
Write-Host "Fazendo commit inicial..." -ForegroundColor Yellow
git commit -m "feat: initial commit - projeto Flowcorte v1.1.0 com Netlify e Supabase"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit realizado" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao fazer commit" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Renomear branch para main
Write-Host "Renomeando branch para 'main'..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branch renomeada para 'main'" -ForegroundColor Green
Write-Host ""

# Perguntar sobre repositório remoto
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CONFIGURAÇÃO DO GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Você já criou o repositório no GitHub?" -ForegroundColor Yellow
Write-Host "Se não, acesse: https://github.com/new" -ForegroundColor Cyan
Write-Host ""
$temRepo = Read-Host "Já criou o repositório? (s/N)"

if ($temRepo -eq "s" -or $temRepo -eq "S") {
    Write-Host ""
    Write-Host "Digite a URL do repositório:" -ForegroundColor Yellow
    Write-Host "Exemplo: https://github.com/seu-usuario/flowcorte.git" -ForegroundColor Cyan
    $repoUrl = Read-Host "URL"
    
    if ($repoUrl) {
        Write-Host ""
        Write-Host "Adicionando repositório remoto..." -ForegroundColor Yellow
        git remote add origin $repoUrl
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Repositório remoto adicionado" -ForegroundColor Green
            Write-Host ""
            
            # Fazer push
            Write-Host "Enviando código para o GitHub..." -ForegroundColor Yellow
            Write-Host "⚠️  Você pode precisar autenticar" -ForegroundColor Yellow
            Write-Host ""
            git push -u origin main
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host ""
                Write-Host "========================================" -ForegroundColor Green
                Write-Host "   ✅ SUCESSO!" -ForegroundColor Green
                Write-Host "========================================" -ForegroundColor Green
                Write-Host ""
                Write-Host "Seu projeto está no GitHub! 🎉" -ForegroundColor Green
                Write-Host ""
                Write-Host "Próximos passos:" -ForegroundColor Cyan
                Write-Host "1. Acesse seu repositório no GitHub" -ForegroundColor White
                Write-Host "2. Adicione descrição e topics" -ForegroundColor White
                Write-Host "3. Configure Netlify para deploy automático" -ForegroundColor White
                Write-Host "4. Adicione secrets no GitHub Actions" -ForegroundColor White
                Write-Host ""
                Write-Host "Documentação completa em: GITHUB.md" -ForegroundColor Yellow
            } else {
                Write-Host ""
                Write-Host "❌ Erro ao fazer push" -ForegroundColor Red
                Write-Host ""
                Write-Host "Possíveis soluções:" -ForegroundColor Yellow
                Write-Host "1. Verifique se a URL está correta" -ForegroundColor White
                Write-Host "2. Use Personal Access Token ao invés de senha" -ForegroundColor White
                Write-Host "3. Consulte: GITHUB.md para mais detalhes" -ForegroundColor White
            }
        } else {
            Write-Host "❌ Erro ao adicionar repositório remoto" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ URL não fornecida" -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "   PRÓXIMOS PASSOS" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Acesse: https://github.com/new" -ForegroundColor Cyan
    Write-Host "2. Nome do repositório: flowcorte" -ForegroundColor White
    Write-Host "3. NÃO adicione README, .gitignore ou license" -ForegroundColor White
    Write-Host "4. Clique em 'Create repository'" -ForegroundColor White
    Write-Host ""
    Write-Host "5. Execute os comandos:" -ForegroundColor Cyan
    Write-Host "   git remote add origin https://github.com/SEU-USUARIO/na-regua.git" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor White
    Write-Host ""
    Write-Host "Ou execute este script novamente!" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Script finalizado!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
