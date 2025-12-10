import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ShopDetailsMain from '../components/main/ShopDetailsMain'
import { getProductDetail } from '../api/services/productService'
import { toast } from 'react-toastify'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is required')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const response = await getProductDetail(id)
        
        if (response && response.result && response.result.product) {
          setProduct(response.result.product)
        } else {
          setError('Product not found')
          toast.error('Product not found')
        }
      } catch (err) {
        console.error('Failed to fetch product:', err)
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load product'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <Layout>
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: '20px' }}>Loading product details...</p>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <ShopDetailsMain product={product} />
    </Layout>
  )
}

export default ProductDetail

