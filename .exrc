" Vim/Neovim local configuration for Prettier format on save
" Make sure 'exrc' and 'secure' are set in your init.vim/init.lua

" Format on save for specific file types
augroup PrettierFormatOnSave
  autocmd!
  autocmd BufWritePre *.js,*.jsx,*.ts,*.tsx,*.json,*.css,*.md silent! !npx prettier --write <afile>
  autocmd BufWritePost *.js,*.jsx,*.ts,*.tsx,*.json,*.css,*.md silent! e
augroup END

" Manual format command
command! Prettier !npx prettier --write %