"use client";

export default function ConfirmSubmitButton({
  confirmMessage,
  className,
  children,
  name,
  value,
}: {
  confirmMessage: string;
  className?: string;
  children: React.ReactNode;
  name?: string;
  value?: string;
}) {
  return (
    <button
      type="submit"
      name={name}
      value={value}
      className={className}
      onClick={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
