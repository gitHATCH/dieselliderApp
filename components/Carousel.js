import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Dimensions } from 'react-native'

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const screenWidth = Dimensions.get("window").width
    const carouselData = [
        {
            id: "01",
            image: require("../assets/images/turbo1.jpg")
        },
        {
            id: "02",
            image: require("../assets/images/turbo2.jpg")
        },
        {
            id: "03",
            image: require("../assets/images/turbo3.jpg")
        }
    ]
    const renderCarItem = ({item,index}) => {
        return (
            <View>
                <Image source={item.image} style={{height: 200, width: screenWidth}} />
            </View>
        )
    }
    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x
        const index = (scrollPosition / screenWidth).toFixed(0)
        setActiveIndex(index)
    }
    const renderDotIndicators = () => {
        return (
            carouselData.map((dot, index) => {
                return <View key={index} style={{backgroundColor:activeIndex == index ? "#001f36" : "orange", height:10, width:10, borderRadius:5, marginHorizontal:6}}></View>
            })
        )
    }

  return (
    <SafeAreaView>
        <FlatList keyExtractor={(item) => item.id} data={carouselData} renderItem={renderCarItem} horizontal={true} pagingEnabled={true} onScroll={handleScroll}/>
        <View style={{flexDirection:"row", justifyContent:"center",marginTop:10}}>
            {renderDotIndicators()}
        </View>
    </SafeAreaView>
  )
}

export default Carousel

const styles = StyleSheet.create({})