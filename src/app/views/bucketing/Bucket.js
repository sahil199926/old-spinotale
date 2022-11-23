import React, { useState,useEffect } from 'react'
import { Button, Input, Col, notification, List, Select, Popconfirm, Tooltip, Typography, Row, Card, Popover, ConfigProvider } from 'antd'
import '../bucketing/bucket.css'
import { DeleteOutlined,FormOutlined, CheckOutlined, LeftCircleOutlined, CloseCircleOutlined, EyeOutlined, RightCircleOutlined } from '@ant-design/icons'
import { getQuestions, createQuestion, deleteQuestion, editQuestion, questionRelations, GetQuestionRelations } from "../../api/bucket.js";
import DnDList from 'react-dnd-list'


const { Option } = Select

  const Bucket = () => {

  const [question, setQuestion] = useState()
  const [questions, setQuestions] = useState([])
  const [bucketQuestions, setBucketQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState('')
  const [editRecord, setEditRecord] = useState({});
  const [questionIds, setQuestionIds] = useState([])

  useEffect(() => {
    getSavedQuestions()
  }, [])

  function cancel(e) {
    //
  }

  const confirm = async (id) => {
    let res = await deleteQuestion({id})
    notification.success({message: 'Success',  duration: 2, description: 'Question successfully deleted!'});
    getSavedQuestions()
  }
  
  const removeQuestion = (question) => {
    const updatedIds = questionIds.filter((e) => e !== question.id)
    setQuestionIds(updatedIds)
    let res = bucketQuestions.filter((e) => e.id !== question.id);
    setBucketQuestions(res)
  }

  const getSavedQuestions = async(status, searchVal) => {
    const res = await getQuestions({word: searchVal ? searchVal : ''});
    // if (status) {
      setQuestionIds([res.data.Response[0].id])
    // }
    setQuestions(res.data.Response);
  }

  const save = async() => {
    if (question) {
      setBucketQuestions([])
      const res = await createQuestion({question})
      notification.success({message: 'Success',  duration: 2, description: 'Question successfully creted!'});
      getSavedQuestions(true)
      setQuestion('')
    }
  }

  const updateData = async(e) => {
    const res = await editQuestion({ id: editRecord.id, question  })
    notification.success({message: 'Success',  duration: 2, description: 'Question successfully updated!'});
    setEditRecord({})
    getSavedQuestions()
  }

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
      <div className='pb-30'>
        <p>
          This question is not exist in our database. Can save save this Question? 
        </p>
        <Button type="primary" size="small" onClick={save}> Yes </Button> &nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );

  const addQuestionInBucket = (question) => {
    if (!questionIds.includes(question.id)) {
      setQuestionIds([...questionIds,question.id])
      setBucketQuestions([...bucketQuestions,question ])
    }
  }

  const createBucket = async() => {
    let questionId = selectedQuestion ? selectedQuestion : questions[0]?.id
    let ids = []
    for (const i of bucketQuestions) {
      ids.push(i?.id)
    }
    const res = await questionRelations({ id: questionId, related_questions: ids })
    notification.success({message: 'Success',  duration: 2, description: 'Bucket successfully created!'});
    getSavedQuestions()
  }

  const getSubQuestionData = async(e) => {
    setSelectedQuestion(e)
    setQuestionIds([])
    const res = await GetQuestionRelations({id: e})
    let tmpArr = [];
    let ids = []
    for (const i of res?.data?.Response?.related_question) {
      let x = {id: i.id, question: i.related_question}
      tmpArr.push(x)
      ids.push(i.id)
    }
    setBucketQuestions(tmpArr);
    setQuestionIds(ids)
  }

  const editData = (e) => {
    setEditRecord(e)
    setQuestion(e.question)
  }

    return (
      <div>
        <Row gutter={16}>

        <Col className="gutter-row pt-30" span={12}>
                <Card title="Question List" bordered={false}>
                  <div className='pt-20'>
                    <Input onChange={ (e) => getSavedQuestions(false, e.target.value) } placeholder="Search question" />
                  </div>
                    <List
                      bordered
                      dataSource={questions}
                      renderItem={(item, i) => (
                        <List.Item>
                          <Typography.Text mark></Typography.Text> 
                         { editRecord.id !== item.id ? <b> {i+1}. </b> : ''}  { editRecord.id !== item.id ?  item.question : ''}
                          <div className="left rl">
                          { editRecord.id !== item.id ? 
                          <>
                          <>
                          { editRecord.id !== item.id ?
                           <div className="right rl-top">
                             { selectedQuestion !== item.id  || questionIds.includes(item.id)? 
                             <Tooltip title="Move To Bucket"> 
                             <RightCircleOutlined onClick={ () => { addQuestionInBucket(item) }} className="blue over-top" />
                           </Tooltip>
                            : ''}
                           </div>
                          : '' }
                          { item.related_question.length ? 
                          <Popover placement="top" title={item.question} content={(
                          <div>
                           <List
                              bordered
                              size="small"
                              dataSource={item.related_question}
                              renderItem={(x, i) => (
                                <List.Item>
                                  <Typography.Text mark></Typography.Text> <b>{i+1}.</b> {x.related_question}
                                </List.Item>
                              )}
                            />
                          </div>
                          )}
                          >
                          <EyeOutlined className="blue pointer over-view"/> 
                          </Popover>
                          : "" }
                          </>
                          <FormOutlined onClick={ () => { editData(item) }} className="blue pointer over-edit"  /> 
                          </>
                          : ''}
                          { editRecord.id === item.id ? 
                          <>
                          <Input className='inputClassName' defaultValue={question} onChange={ (e) => { setQuestion(e.target.value) } } /> 
                          <span className='update'>
                            <CheckOutlined onClick={ () => { updateData(item.question) }} /> 
                          </span>
                          </>
                          : '' }                          
                          { editRecord.id !== item.id ? 
                          <Popconfirm
                            title="Are you sure delete this question?"
                            onConfirm={ () => confirm(item.id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                          <DeleteOutlined className="danger pointer over"  />
                          </Popconfirm>
                          : '' }
                          </div>
                        </List.Item>
                      )}
                    />
                </Card>
            </Col>

            <Col className="gutter-row pt-30" span={12}>
              <Card
                title="Create Bucket"
                bordered={false}
                style={{ width: '100%' }}
              >
                <ConfigProvider renderEmpty={ customizeRenderEmpty }>
                <Select
                  showSearch
                  autoClearSearchValue={true}
                  placeholder="Please select question"
                  optionFilterProp="children"
                  onChange={getSubQuestionData}
                  value={selectedQuestion ? selectedQuestion : questions[0]?.id}
                  onSearch={ (e) => { e && setQuestion(e) } }
                  style={{
                    width: '100%',
                    paddingBottom: '20px' 
                  }}
                >
                {questions &&
                  questions.map((e, i) => {
                    return (<> <Option key={e.id} value={e.id}>{e.question}</Option> </>)
                  })}
                </Select>
                </ConfigProvider>
                <List
                  bordered
                  dataSource={bucketQuestions}
                  renderItem={(item, i) => (
                    <List.Item>
                      <Typography.Text></Typography.Text> <b> {i+1}. </b> {item?.question}
                      <div className="right rl">
                        <CloseCircleOutlined onClick={ () => { removeQuestion(item) } } className="danger pointer over" /> 
                      </div>
                    </List.Item>
                  )}
                />

                {
                  questionIds.length ? 
                  <div className="right pt-10">
                  <Button type="primary" size="small" onClick={createBucket}> Save in bucket</Button>
                </div>
                : ''
                }
              </Card>
            </Col>
        </Row>
      </div>
    )
}

export default Bucket
