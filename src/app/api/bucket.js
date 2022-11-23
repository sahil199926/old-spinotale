import request from '../utils/request'

export function getQuestions(data) {
  return request({
    url: '/findquestion',
    method: 'post',
    data
  })
}

export function createQuestion(data) {
  return request({
    url: '/questions',
    method: 'post',
    data
  })
}

export function deleteQuestion(data) {
  return request({
    url: '/questions',
    method: 'delete',
    data
  })
}

export function editQuestion(data) {
  return request({
    url: '/questions',
    method: 'put',
    data
  })
}

export function questionRelations(data) {
  return request({
    url: '/questionrelations',
    method: 'post',
    data
  })
}

export function GetQuestionRelations(data) {
  return request({
    url: '/getquestionrelations',
    method: 'post',
    data
  })
}

