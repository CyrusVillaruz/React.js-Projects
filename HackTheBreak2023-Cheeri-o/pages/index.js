import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import StringToPDF from "./StringToPDF";

export default function Home() {
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [positionInput, setPositionInput] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [result, setResult] = useState();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsButtonClicked(true);
    if (
      !jobTitleInput.trim() ||
      !skillInput.trim() ||
      !positionInput.trim() ||
      !durationInput.trim() ||
      !descriptionInput.trim() ||
      !nameInput.trim()
    ) {
      alert("Please enter all the required fields");
      return;
    }
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: jobTitleInput,
          skills: skillInput,
          pastJobs: positionInput,
          duration: durationInput,
          jobDescription: descriptionInput,
          name: nameInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      function removeNewlineBeforeWords(s) {
        // Define pattern to match newline character before words
        const pattern = /^[\n]+([A-Za-z])/;

        // Replace matched pattern with the first letter of the word
        return s.replace(pattern, "$1");
      }
      function removeNewlineAfterWords(s) {
        // Define pattern to match newline character after words
        const pattern = /([A-Za-z])[ \t]*[\n]+/g;

        // Replace matched pattern with the first letter of the word
        return s.replace(pattern, "$1 ");
      }

      setResult(
        removeNewlineAfterWords(removeNewlineBeforeWords(data.result.trim()))
      );
      setJobTitleInput("");
      setSkillInput("");
      setPositionInput("");
      setDurationInput("");
      setDescriptionInput("");
      setNameInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsButtonClicked(false);
    }
  }

  // Randomizer: Generate random job title
  function randomJobTitle() {
    const jobTitles = [
      "Software Engineer",
      "Piano Teacher",
      "Guest Experience Expert",
      "Baker",
      "Pro Gamer",
      "Swim Instructor",
      "Painter",
      "Comedian",
    ];
    const randomIndex = Math.floor(Math.random() * jobTitles.length);
    return jobTitles[randomIndex];
  }

  function randomSkill() {
    const skills = [
      "Multi-tasking",
      "Being organized",
      "Juggling",
      "Java",
      "C",
      "Python",
      "Running really fast",
      "Eating a lot of food",
    ];
    const randomIndex = Math.floor(Math.random() * skills.length);
    return skills[randomIndex];
  }

  function randomPosition() {
    const position = ["Student", "Tutor", "Freelancer"];
    const randomIndex = Math.floor(Math.random() * position.length);
    return position[randomIndex];
  }

  function randomDuration() {
    const duration = ["1 year", "3 months", "5 years", "6 months"];
    const randomIndex = Math.floor(Math.random() * duration.length);
    return duration[randomIndex];
  }

  function randomDescription() {
    const description = [
      "Team leader",
      "Tried not to break anything",
      "Kept operations running",
      "Linked list master",
    ];
    const randomIndex = Math.floor(Math.random() * description.length);
    return description[randomIndex];
  }

  function randomName() {
    const name = [
      "Elsa",
      "Mai",
      "Cyrus",
      "Nico",
      "Tomek",
      "Justin",
      "Trevor",
      "Troy",
      "Kate",
      "Haurence",
      "Turtino",
    ];
    const randomIndex = Math.floor(Math.random() * name.length);
    return name[randomIndex];
  }

  function onSurpriseClick() {
    setJobTitleInput(randomJobTitle());
    setSkillInput(randomSkill());
    setPositionInput(randomPosition());
    setDurationInput(randomDuration());
    setDescriptionInput(randomDescription());
    setNameInput(randomName());
  }

function Icon(props) {
  const className = isButtonClicked ? `index_icon__CgRrC icon` : props.className;
  return <img src={props.src} id="cowboy" className={className} alt={props.alt} />;
}


  return (
    // <div style={{backgroundColor: '#FFFFF0'}}>
    <div>
      <Head>
        <title>Cover Letter Generator</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <Icon
          src="./cowboyemoji.png"
          className={styles.cowboy}
          alt="cowboy emoji"
        />
        <h3>Cover Letter Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter a job title"
            value={jobTitleInput}
            onChange={(e) => setJobTitleInput(e.target.value)}
          />
          <input
            type="text"
            name="skills"
            placeholder="Enter your skills (comma-separated)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <input
            type="text"
            name="position"
            placeholder="Enter your past job positions"
            value={positionInput}
            onChange={(e) => setPositionInput(e.target.value)}
          />
          <input
            type="text"
            name="duration"
            placeholder="Enter your past job duration"
            value={durationInput}
            onChange={(e) => setDurationInput(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="Enter your job description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input type="button" value="Surprise me!" onClick={onSurpriseClick} />
          <input type="submit" value="Yeehaw, let's go!"/>
        </form>
        <StringToPDF stringToConvert={result} />
      </main>
    </div>
  );
}
