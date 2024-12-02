interface PageTitleProps {
  children: React.ReactElement | React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 className="text-3xl shadow-text text-slate-50 font-semibold text-center py-2 mb-3 bg-gradient-to-r from-white via-slate-500 to-white">
      {children}
    </h1>
  );
};
