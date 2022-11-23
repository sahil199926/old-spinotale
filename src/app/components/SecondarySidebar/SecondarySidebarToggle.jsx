import clsx from 'clsx'
import React, { useState } from 'react'
import { styled, useTheme } from '@mui/system'
import useSettings from 'app/hooks/useSettings'
import { Drawer, Row, DatePicker, Col, Button, Switch } from 'antd'
import { Fab, IconButton, Icon } from '@mui/material'
import { FilterFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import { getStartDateAndEndDate } from '../../redux/actions/DateFilter'
import moment from 'moment'
import '../../components/SecondarySidebar/secondary.css'
const { RangePicker } = DatePicker

const Toggle = styled('div')(() => ({
    position: 'fixed',
    right: '30px',
    bottom: '50px',
    zIndex: 99,
    transition: 'all 0.15s ease',
    '&.open': {
        right: '10px',
    },
}))

const SecondarySidebarToggle = () => {

    const [state, setState] = useState({
        selection1: {
          startDate: addDays(new Date(), -360),
          endDate: new Date(),
          key: 'selection1'
        },
        selection2: {
          startDate: addDays(new Date(), 1),
          endDate: addDays(new Date(), 7),
          key: 'selection2'
        }
      });
      
    const { settings, updateSettings } = useSettings()
    const toggle = () => {
        updateSettings({secondarySidebar: { open: !settings.secondarySidebar.open }})
    }

    const { palette } = useTheme()
    const textColor = palette.primary.contrastText
    const [visible, setVisible] = useState(false)
    const [currStartEndDate, setCurrStartEndDate] = useState([])
    const [preStartEndDate, setPreStartEndDate] = useState([])
    const [comparisionFlag, setComparision] = useState(false)
    const dispach = useDispatch()

    const getStartAndDate = (e) => {
        if (!e) return null
        setCurrStartEndDate([e[0]._d, e[1]._d])
    }

    const getPrevStartAndDate = (e) => {
        if (!e) return null
        setPreStartEndDate([e[0]._d, e[1]._d])
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    const applyFilter = () => {
        console.log(state," state");
        const obj = {
            // currStartEndDate,
            // preStartEndDate,
            currStartEndDate: state.selection1,
            preStartEndDate: state.selection2,
            comparision: comparisionFlag,
            clickByRedux: true,
        }
        dispach(getStartDateAndEndDate(obj))
        onClose()
    }

    const dateArr = [];

    const comparisionStatus = (e) => {
        setComparision(e.toString().charAt(0).toUpperCase() + e.toString().slice(1).toLowerCase())
    }

    const dateFormat = 'YYYY-MM-DD'

    return (
        <Toggle className={clsx({ open: settings.secondarySidebar.open })}>
            {settings.secondarySidebar.open && (
                <IconButton onClick={toggle} size="small" aria-label="toggle">
                    <Icon sx={{ color: textColor }}>close</Icon>
                </IconButton>
            )}
            {!settings.secondarySidebar.open && (
                <Fab color="primary" aria-label="expand" onClick={toggle}>
                    <Icon sx={{ color: textColor }}>settings</Icon>
                </Fab>
            )}
            <Fab
                style={{ top: '-490px' }}
                color="primary"
                onClick={showDrawer}
                aria-label="expand"
            >
                <FilterFilled sx={{ color: textColor }}>settings</FilterFilled>
            </Fab>
            <Drawer
                title="Apply Filter"
                width="730"
                placement="right"
                onClose={onClose}
                visible={visible}
            >
                <Row justify="start">
                    {/* <Col span={12}>
                        Current Date Calendar
                        <RangePicker
                            defaultValue={[
                                moment('2021-07-10', dateFormat),
                                moment('2022-06-05', dateFormat),
                            ]}
                            placement="bottomLeft"
                            onChange={getStartAndDate}
                        />
                    </Col> */}

                    {/* {comparisionFlag == 'True' ? (
                        <Col span={12}>
                            Previous Date Calendar
                            <RangePicker
                                placement="bottomLeft"
                                onChange={getPrevStartAndDate}
                            />
                        </Col>
                    ) : (
                        ''
                    )} */}

                    <Col span={24}>
                        Comparision:
                        <Switch onChange={comparisionStatus} />
                        <br />
                        <br />
                    </Col>
                    <DateRangePicker
                        onChange={item => setState({ ...state, ...item })}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={ comparisionFlag == 'True' ?  [state.selection1, state.selection2] : [state.selection1]}
                        direction="horizontal"
                        ariaLabels={{
                            dateInput: {
                            selection1: { startDate: "start date input of selction 1", endDate: "end date input of selction 1" },
                            selection2: { startDate: "start date input of selction 2", endDate: "end date input of selction 2" }
                            },
                            monthPicker: "month picker",
                            yearPicker: "year picker",
                            prevButton: "previous month button",
                            nextButton: "next month button",
                        }}
                    />

                    <Col span={24} style={{ textAlign: 'right' }}>
                        <br />
                        <Button type="primary" onClick={applyFilter}>
                            Apply{' '}
                        </Button>
                    </Col>
                </Row>
            </Drawer>
        </Toggle>
    )
}

export default SecondarySidebarToggle
