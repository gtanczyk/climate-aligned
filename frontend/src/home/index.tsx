import React from "react";
// @ts-ignore
import {Button} from "monday-ui-react-core"

import logo from "../logo-full.png";
import styled from "styled-components";

export default function Home(props: {
    onSurvey: () => void;
    onStats: () => void;
}) {
    return <HomeContainer>
        <header>
            <img src={logo} alt="Climate Aligned"/>
            <p>Get your team together to align on the goal of greener tomorrow.</p>
        </header>
        <main>
            <div>
                Start here!
                <Button onClick={props.onSurvey}>Update your personal assessment</Button>
            </div>
            <div>
                After your assessment, check statistics of your team:
                <Button onClick={props.onStats}>Show statistics</Button>
            </div>
        </main>
    </HomeContainer>;
}

const HomeContainer = styled.div`
  display: flex;
  gap: 20px;

  header {
    width: 30%;

    img {
      width: 100%;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    >div {
      display: flex;
      flex-direction: column;
    }
  }
`;