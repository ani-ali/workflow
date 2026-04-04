-- Project-specific Neovim configuration for Prettier formatting
-- Add this to your Neovim config or source it

-- Option 1: Using null-ls (if you have it installed)
-- Uncomment if using null-ls
--[[
local null_ls = require("null-ls")
null_ls.setup({
  sources = {
    null_ls.builtins.formatting.prettier,
  },
})
--]]

-- Option 2: Using built-in LSP formatting with prettier
-- This sets up an autocommand to format on save
vim.api.nvim_create_autocmd("BufWritePre", {
  pattern = { "*.js", "*.jsx", "*.ts", "*.tsx", "*.json", "*.css", "*.md" },
  callback = function()
    -- Format using prettier command
    vim.cmd("silent !npx prettier --write %")
    -- Reload the file to see changes
    vim.cmd("edit")
  end,
})

-- Option 3: Using conform.nvim (if you have it installed)
-- Uncomment if using conform.nvim
--[[
require("conform").setup({
  formatters_by_ft = {
    javascript = { "prettier" },
    typescript = { "prettier" },
    javascriptreact = { "prettier" },
    typescriptreact = { "prettier" },
    json = { "prettier" },
    css = { "prettier" },
    markdown = { "prettier" },
  },
  format_on_save = {
    timeout_ms = 500,
    lsp_fallback = true,
  },
})
--]]

-- Option 4: Manual format command
vim.api.nvim_create_user_command("PrettierFormat", function()
  vim.cmd("!npx prettier --write %")
  vim.cmd("edit")
end, {})