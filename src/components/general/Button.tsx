import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ isLoading = false, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={isLoading || rest.disabled}
      className={`
        flex items-center justify-center
        px-4 py-2 
        bg-blue-500 hover:bg-blue-600 
         font-semibold 
        inter
        ${rest.className ?? ''}
      `}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}
