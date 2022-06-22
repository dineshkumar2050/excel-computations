import React,{ useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from './Button'
import { useHistory, useLocation } from 'react-router-dom';

function CarItem({ car, ...rest }) {
    const [isAdmin, setIsAdmin] = useState();
    const location = useLocation();
    const history = useHistory();
    const { pathname } = location;
    useEffect(() => {
        const result = pathname.includes('/admin')
        setIsAdmin(result)
    },[])
    const showDetails = (e,car) => {
        e.preventDefault();
        history.push({
            pathname: `/user/car-details/${car.id}`,
            state: {
                car
            }
        })
    }
    const handleButtonClick = (e, type, id) => {
        e.preventDefault();
        if(type === 'edit'){

        } else if(type === 'delete'){

        }
    }
    return (
        <ListItem onClick={isAdmin ? null : e => showDetails(e,car)} key={car.id}>
            <TopSection>
                <Image 
                    src={car.imageUrl}
                    alt={car.name}
                    onError={
                        event => {
                            event.target.src = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png'
                            event.onerror = null
                        }
                    }
                />
            </TopSection>
            <BottomSection className={'py-3'}>
                <NameHeading className={'mb-2'}>{car.name}</NameHeading>
                <BookingType  className={'mb-2'}>
                    <AllOtherHeadings>Booking Type</AllOtherHeadings>
                    <BookingTypeList className={'d-flex justify-content-center align-items-center flex-wrap'}>
                        {
                            car.bookingType && car.bookingType.length > 0 &&
                            car.bookingType.map((bookingType,index) => {
                                return(
                                    <BookingTypeListItem className={`${index > 0 && index < car.bookingType.length - 1 ? 'mx-3': ''} mb-2`} key={index}>
                                        {bookingType}
                                    </BookingTypeListItem>
                                )
                            })
                        }
                    </BookingTypeList>
                </BookingType>
                <Status  className={'mb-2'}>
                    <AllOtherHeadings>Status</AllOtherHeadings>
                    {car.status}
                </Status>
                <PriceByType>
                    <AllOtherHeadings>Price(perkm) by type</AllOtherHeadings>
                    <PriceByTypeList className={'d-flex align-items-center justify-content-center flex-wrap'}>
                        {
                            car.priceByType && car.priceByType.length > 0 &&
                            car.priceByType.map((priceByType,index) => {
                                return(
                                    <PriceByTypeListItem key={index} className={'d-flex align-items-center'}>
                                        {
                                            <PriceByTypeListItemTag>{priceByType.key}</PriceByTypeListItemTag>
                                        }
                                        {
                                            <PriceByTypeListItemValue>{priceByType.value}</PriceByTypeListItemValue>
                                        }
                                    </PriceByTypeListItem>
                                )
                            }) 
                        }
                    </PriceByTypeList>
                </PriceByType>
                {
                    isAdmin &&
                    <Buttons className={'d-flex align-items-center justify-content-center mt-2'}>
                        <Button style={{ marginRight: '15px' }} className={'mb-2'} text={'Edit'} handleClick={e => handleButtonClick(e, 'edit', car.id)} />
                        <Button className={'mb-2'} text={'Delete'} handleClick={e => handleButtonClick(e, 'delete', car.id)} />
                    </Buttons>
                }
            </BottomSection>
        </ListItem>
    )
}

const Buttons = styled.div`
    display: flex;
    align-items: center;
`;

const PriceByTypeListItemValue = styled.span`
    font-size: 12px;
    border: 1px solid #000;
    padding: 5px 15px;
`;
const PriceByTypeListItemTag = styled.span`
    font-size: 12px;
    border: 1px solid #000;
    padding: 5px 15px;
    border-right: none;
`;
const PriceByTypeListItem = styled.li`
    margin:0 10px 10px 0;
`;
const PriceByTypeList = styled.ul``;
const PriceByType = styled.div``;
const Status = styled.div``;
const BookingType = styled.div``;
const BookingTypeList = styled.ul``;
const BookingTypeListItem = styled.li`
    font-size: 12px;
    border: 1px solid #000;
    padding: 5px 15px;
`;

const AllOtherHeadings = styled.h6``;

const NameHeading = styled.h5``;

const Image = styled.img`
    max-width: 200px;
    object-fit: cover;
`;

const ListItem = styled.li``;

const TopSection = styled.div`
    border: 1px solid #000;
    height: 115px;
`;

const BottomSection = styled.div`
    border: 1px solid #000;
    border-top: none;
`;

CarItem.propTypes = {
    car: PropTypes.object
}

export default CarItem
