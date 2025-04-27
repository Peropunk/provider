import Image from "next/image";
import Hero from "./components/Hero";
import CardSlider from "./components/CardSlider";
import Solutions from "./components/Solutions";

export default function Home() {
  return (
    <>
    <Hero/>
    <CardSlider/>
    <Solutions/>
    </>
  );
}
