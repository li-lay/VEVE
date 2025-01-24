import Wrapper from "../components/Wrapper";

const Dashboard = () => {
  return (
    <Wrapper>
      <div className="mt-8 text-center">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-primary animate-pulse-slow">
          Welcome to VEVE
        </h1>
        <p className="mt-4 text-secondary/80 dark:text-secondary/60 max-w-2xl mx-auto text-[clamp(1rem,2.5vw,1.25rem)]">
          Happy New Year 2025
        </p>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
