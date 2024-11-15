<template>
    <div class="min-h-screen bg-white p-4 md:p-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-cyan-500 mb-6 text-center">Support Our Cause</h1>
        <p class="text-gray-600 mb-8 text-center">Your donation helps us make a difference. Choose your preferred payment method below.</p>
  
        <div class="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle class="text-cyan-500">Prompt Pay QR Code</CardTitle>
              <CardDescription>Scan with your mobile banking app</CardDescription>
            </CardHeader>
            <CardContent class="flex justify-center">
              <div class="w-48 h-48 bg-gray-200 flex items-center justify-center">
                <QrCode size="160" class="text-cyan-500" />
              </div>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle class="text-cyan-500">Other Payment Methods</CardTitle>
              <CardDescription>Choose your preferred way to donate</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <Button class="w-full bg-cyan-500 hover:bg-cyan-600" @click="donate('PayPal')">
                <Paypal class="mr-2 h-4 w-4" /> Donate with PayPal
              </Button>
              <Button class="w-full bg-cyan-500 hover:bg-cyan-600" @click="donate('Credit Card')">
                <CreditCard class="mr-2 h-4 w-4" /> Donate with Credit Card
              </Button>
            </CardContent>
          </Card>
        </div>
  
        <Card class="mt-8">
          <CardHeader>
            <CardTitle class="text-cyan-500">Enter Custom Amount</CardTitle>
            <CardDescription>Specify the amount you wish to donate</CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="submitDonation">
              <div class="flex items-center space-x-2">
                <Label for="amount" class="sr-only">Amount</Label>
                <Input id="amount" v-model="amount" type="number" placeholder="Enter amount" class="flex-grow" />
                <Button type="submit" class="bg-cyan-500 hover:bg-cyan-600">Donate</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@/components/ui'
  import { QrCode, CreditCard, ShoppingCartIcon as Paypal } from 'lucide-vue-next'
  
  const amount = ref('')
  
  const donate = (method) => {
    alert(`${method} donation process`)
  }
  
  const submitDonation = () => {
    alert('Custom donation submitted!')
  }
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  </style>