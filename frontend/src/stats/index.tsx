// @ts-ignore
import {Button, Dropdown} from "monday-ui-react-core"
// @ts-ignore
import {MoveArrowUp, MoveArrowDown} from "monday-ui-react-core/dist/allIcons";

import Questions, {Question} from "../data/questions";
import {useMondayUsersRead, useStorageUserSettingRead} from "../data/monday-hooks";
import {useEffect, useState} from "react";
import styled from "styled-components/macro";
import {QuestionInfo} from "../survey";

export default function Stats(props: {
    onHome: () => void;
}) {
    const readUsers = useMondayUsersRead();
    const [responses, setResponses] = useState<Record<string, { positive: number, negative: number }>>({});
    const readSetting = useStorageUserSettingRead();

    useEffect(() => {
        readUsers().then(async ({users}) => {
            const responses: Record<string, { positive: number, negative: number }> = {};
            for (const user of users) {
                const survey = await readSetting(user.id, "surveyData", {});
                for (const question of Questions) {
                    if (!responses[question.text]) {
                        responses[question.text] = {positive: 0, negative: 0};
                    }
                    if (survey[question.text]) {
                        responses[question.text].positive++;
                    } else {
                        responses[question.text].negative++;
                    }
                }
            }
            setResponses(responses);
        })
    }, []);

    return <>
        <Button onClick={props.onHome}>Go back</Button>
        <p>See how your team is doing to help the planet.</p>
        {Questions.map(question => <QuestionStats key={question.text} question={question}
                                                  responses={responses[question.text] || {positive: 0, negative: 0}}/>)}
    </>;
}

function QuestionStats(props: { question: Question, responses: { positive: number, negative: number } }) {
    const scalePositive = props.responses.positive / (props.responses.positive + props.responses.negative);

    return <StatsContainer>
        <span className="positive" style={{"--scale": scalePositive} as React.CSSProperties}><MoveArrowUp/> {props.responses.positive}</span>
        <span className="negative" style={{"--scale": 1 - scalePositive} as React.CSSProperties}><MoveArrowDown/> {props.responses.negative}</span>
        <QuestionInfo question={props.question} />
    </StatsContainer>
}

const StatsContainer = styled.div`
  display: flex;
  width: 50%;
  margin-bottom: 10px;
  
  .positive, .negative {
    display: flex;
    align-items: center;
    color: white;
    padding: 0 8px;
    text-align: center;
    opacity: var(--scale)
  }

  .positive {
    background: rgb(3, 127, 76);
  }
  
  .negative {
    background-color: rgb(226, 68, 92);
  }
  
  > span:last-child {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin-left: 10px;
    
    h4 {
      margin: 8px 0px;
      margin-right: 10px;
      cursor: pointer;
    }
    
    svg {
      cursor: pointer;
    }
  }
`;