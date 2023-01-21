import { Box, Button, Divider, Flex, HStack, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CapitalizeFirstTxt, ChangeCurrency, ContainerBtn, HeaderText1, MainVContainer, SecondVContainer } from "../../utils";

import { API } from "../lib/api";

const Services = () => {
    const [category, setCategory] = useState([]);
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({
    category: 0,
    services: "",
  });
  useEffect(() => {
    fetch(`${API()}category`)
      .then((d) => d.json())
      .then((d) => setCategory(d));
    fetch(`${API()}service`)
      .then((d) => d.json())
      .then((d) => setServices(d));
  }, []);
  const router = useRouter()
  return (
    <SecondVContainer >
      
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Tabs w='full' variant='soft-rounded' colorScheme={'pink'}>
        <TabList
          onClick={(e) =>
            setSelected((s) => ({ ...s, category: e.target.value }))
          }
        >
          {category?.map((c, i) => {
            return (
              <Tab key={i} value={i} textTransform='capitalize'>
                {c.name}
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          {category?.map((c, i) => {
            return (
              <TabPanel key={i}>
                {services?.map((s, i) => {
                  if (category[selected.category]?._id == s.categoryId) {
                    return <ContainerBtn key={i} func={() => router.push(`services/${s.href}`)}>
                      <Flex minW='max-content' alignItems='center' gap='2' w={'full'}>
                        <VStack alignItems={'start'}>
                        <HeaderText1 txt={CapitalizeFirstTxt(s.name)} fs='1.2rem'/>
                        <HeaderText1 txt={(CapitalizeFirstTxt(s.description))} fs='0.8rem'/>
                        </VStack>
                        <Spacer/>
                        <Box w='1px' h='auto' bg={'blackAlpha.500'}/>
                        <VStack alignItems={'end'} >
                        <HeaderText1 txt={ChangeCurrency(parseInt(s.price)) + s.currency} fs='1.2rem'/>
                        <HeaderText1 txt={s.duration} fs='0.8rem'/>
                        </VStack>

                      </Flex>
                    </ContainerBtn>;
                  }
                })}
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </SecondVContainer>
  );
}

export default Services