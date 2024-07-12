import { Link } from "@nextui-org/link";
import { GithubIcon, Google, LinkedIn } from "../common/icons";
import { useNavigate } from "@remix-run/react";

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="relative flex flex-col w-full">
      <div className="flex flex-row justify-between w-full gap-4 mx-auto max-w-4xl px-4 sm:px-6 relative grow py-2 sm:py-4">
        <h2 className="text-primary font-bold text-lg">Frontend Developer</h2>
        <div className="flex flex-row gap-2 items-center mt-1">
          <GithubIcon className="cursor-pointer hover:text-primary" onClick={() => navigate('https://github.com/n3mooo', { replace: true })} />
          <LinkedIn className="cursor-pointer hover:text-primary" onClick={() => navigate('https://www.linkedin.com/in/liam-tr', { replace: true })} />
          <Google className="cursor-pointer hover:text-primary" onClick={() => navigate('mailto:imliam.se@gmail.com', { replace: true })} />
        </div>
      </div>
    </footer>
  );
}
