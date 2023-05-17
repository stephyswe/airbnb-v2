interface CustomProps {
  children: React.ReactNode;
  root?: boolean;
}

export const ContainerCard: React.FC<CustomProps> = ({
  children,
  root = false,
}) => {
  const containerClasses = root ? "pt-24" : "mt-10";
  const gridClasses =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8";

  return <div className={`${containerClasses} ${gridClasses}`}>{children}</div>;
};

export default ContainerCard;
