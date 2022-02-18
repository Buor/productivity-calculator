import React, {useMemo, useState} from 'react'
import {IAction, IActionPercentage} from '../../../../core/timeAnalyzer';
import {Box} from '@chakra-ui/react';
import {Card} from '../../../ui/Card';
import {EfficiencyBlockActionsModal} from './EfficiencyBlockActionsModal';
import {Title} from '../../../ui/Title';
import {SearchIcon} from "@chakra-ui/icons";

interface IProps {
    actionsPercentages: IActionPercentage[],
    actions: IAction[]
}

export const EfficiencyBlock: React.FC<IProps> = ({actionsPercentages, actions}) => {

    const [modalActionsType, setModalActionsType] = useState<null | string>(null)

    const actionsPart = useMemo(() => {
        switch (modalActionsType) {
            case 'Positive actions':
                return actions.filter(action => action.nature === 'positive')
            case 'Negative actions':
                return actions.filter(action => action.nature === 'negative')
            default:
                return actions.filter(action => action.nature === 'neutral')
        }
    }, [modalActionsType])

    const handleCardClick = (actionsName: string) => {
        setModalActionsType(actionsName)
    }

    const closeModal = () => {
        setModalActionsType(null)
    }

    return (
        <>
            <Title>Results:</Title>
            <Box d={'flex'}
                 justifyContent={'space-evenly'}
                 flexWrap={'wrap'} mt={4}
            >
                {actionsPercentages.map(percentage =>
                    <Card key={percentage.name}
                          flex={['0 1 80%', '0 1 25%']}
                          mt={[4, null, 0]}
                          _hover={{
                              cursor: 'pointer',
                              bg: 'custom.mediumDark'
                          }}
                          opacity={0}
                          animate={{opacity: 100}}
                          transition={{delay: .1, duration: 7}}
                          onClick={() => handleCardClick(percentage.name)}
                    >
                        <Box color={'white'}
                             as={'h3'}
                             fontSize={24}
                             textAlign={'center'}
                             w={['auto', '150px']}
                        >
                            {percentage.name}
                        </Box>
                        <Box color={percentage.color || 'white'}
                             mt={4}
                             fontSize={24}
                        >
                            {percentage.percentage + '%'}
                        </Box>
                        <Box mt={4}>
                            <SearchIcon/> Click to examine!
                        </Box>
                    </Card>)}
            </Box>
            {modalActionsType &&
                <EfficiencyBlockActionsModal actions={actionsPart} actionsType={modalActionsType} close={closeModal}/>}
        </>
    )
}