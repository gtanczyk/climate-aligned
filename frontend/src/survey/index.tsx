// @ts-ignore
import {Button, IconButton, Dropdown, Tipseen, TipseenImage} from "monday-ui-react-core"
// @ts-ignore
import {LearnMore, ThumbsUp} from "monday-ui-react-core/dist/allIcons";
import styled from "styled-components";

import Questions, {Question} from "../data/questions";
import {useMondayContext, useStorageUserSetting, useStorageUserSettingWrite} from "../data/monday-hooks";
import {useState} from "react";

export default function Survey(props: {
    onHome: () => void;
}) {
    const mondayContext = useMondayContext()
    const [surveyData, reloadSurveyData] = useStorageUserSetting<Record<string, boolean>>(mondayContext?.user.id, "surveyData");
    const settingWrite = useStorageUserSettingWrite();

    return <>
        <Button onClick={props.onHome}>Go back</Button>
        <p><b>Hello there!</b> Make your personal climate assessment:</p>
        {Questions.map(question => <QuestionForm key={question.text} question={question}
                                                 isPositive={surveyData?.[question.text] === true}
                                                 onChange={async (isPositive) => {
                                                     await settingWrite(mondayContext?.user.id, "surveyData", {
                                                         ...surveyData,
                                                         [question.text]: isPositive
                                                     })
                                                     await reloadSurveyData();
                                                 }
                                                 }/>)}
    </>;
}

function QuestionForm(props: { question: Question, isPositive: boolean, onChange: (isPositive: boolean) => void }) {
    return <QuestionContainer>
        <IconButton icon={ThumbsUp} kind={props.isPositive ? IconButton.kinds.PRIMARY : IconButton.kinds.SECONDARY}
                    onClick={() => props.onChange(!props.isPositive)}/>
        <QuestionInfo question={props.question}/>
    </QuestionContainer>
}

function QuestionInfo(props: { question: Question }) {
    const [visible, setVisible] = useState(false);

    const Trigger = () => <>
        <h4 onClick={() => setVisible(!visible)}>{props.question.text} </h4>
        <LearnMore onClick={() => setVisible(!visible)}/>
    </>;

    if (!visible) {
        return <span><Trigger/></span>;
    }

    return <Tipseen
        position={Tipseen.positions.RIGHT}
        content={<>
            <TipseenImage src={props.question.imgSrc}/>
            <InfoDescription>
                <h4>{props.question.text}</h4>
                <p>{props.question.description}</p>
                <p><b>Action</b> {props.question.action}</p>
                <div className="buttons">
                    <Button size={Button.sizes.SMALL} onClick={() => window.open(props.question.full)}>Read
                        more</Button>
                </div>
            </InfoDescription>
        </>}>
        <Trigger/>
    </Tipseen>
}

const QuestionContainer = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  margin-right: 50%;

  > span {
    display: flex;
    flex-grow: 1;
  }

  h4 {
    margin: 0;
    text-align: left;
    padding-left: 10px;
    flex-grow: 1;
    cursor: pointer;
  }
`;

const InfoDescription = styled.div`
  padding: 15px;

  h4 {
    margin-top: 0;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;